// backend/controllers/marksController.js
const StudentMarks = require('../models/StudentMarks');
const User = require('../models/User');

const resolveStudentIdStrict = async (inputId) => {
  if (!inputId || typeof inputId !== 'string') return null;

  const trimmed = inputId.trim();

  // Lookup by your DB field:  User.Id
  const user = await User.findOne({ Id: trimmed }).select('_id role');
  return user ? user._id : null;
};

const getMarksByStudent = async (req, res) => {
  try {
    const inputId = req.params.Id;

    const Id = await resolveStudentIdStrict(inputId);

    if (!Id) {
      return res.status(404).json({ msg: 'Student not found using Student ID.' });
    }

    const marks = await StudentMarks.find({ Id })
      .sort({ academicYear: -1, semester: -1 });

    if (!marks.length) {
      return res.status(404).json({ msg: 'No marks found for this student.' });
    }

    return res.json(marks);
  } catch (err) {
    console.error('GET MARKS ERROR:', err.message);
    return res.status(500).send('Server error');
  }
};

const getMarksByCourse = async (req, res) => {
  try {
    const courseCode = req.params.courseCode.toUpperCase();
    const marks = await StudentMarks.find({ courseCode })
      .populate('studentId', 'firstName lastName Id');

    if (!marks.length) {
      return res.status(404).json({ msg: 'No marks found for this course.' });
    }

    return res.json(marks);
  } catch (err) {
    console.error('GET COURSE MARKS ERROR:', err.message);
    return res.status(500).send('Server error');
  }
};

const addStudentMarks = async (req, res) => {
  const { Id, course, courseCode, semester, marks, grade, academicYear } = req.body;

  try {
    // Basic required-field validation
    if (!Id) return res.status(400).json({ msg: 'Student ID (Id) is required.' });
    if (!course) return res.status(400).json({ msg: 'course is required.' });
    if (!courseCode) return res.status(400).json({ msg: 'courseCode is required.' });
    if (!academicYear) return res.status(400).json({ msg: 'academicYear is required.' });

    // Strict student lookup — search User.Id only (returns the Mongo _id)
    const resolvedStudentId = await resolveStudentIdStrict(Id);

    if (!resolvedStudentId) {
      return res.status(404).json({ msg: 'Student not found using Student ID.' });
    }

    // Verify the resolved user is a student
    const student = await User.findById(resolvedStudentId).select('role');
    if (!student || student.role !== 'student') {
      return res.status(400).json({ msg: 'Resolved user is not a student.' });
    }

    // Normalize/validate courseCode safely
    const normalizedCode = typeof courseCode === 'string' ? courseCode.trim().toUpperCase() : null;
    if (!normalizedCode) return res.status(400).json({ msg: 'Invalid courseCode.' });

    // Prevent duplicates: use the internal Mongo ObjectId field 'studentId'
    const exists = await StudentMarks.findOne({
      studentId: resolvedStudentId,
      courseCode: normalizedCode,
      semester,
      academicYear
    });

    if (exists) {
      return res.status(400).json({ msg: 'Marks already exist for this student for this course/semester.' });
    }

    // Create document — IMPORTANT: use studentId (Mongo _id) here
    const newMarks = new StudentMarks({
      studentId: resolvedStudentId, // <--- internal Mongo _id
      course,
      courseCode: normalizedCode,
      semester,
      marks,
      grade,
      academicYear
    });

    const saved = await newMarks.save();

    return res.status(201).json(saved);
  } catch (err) {
    console.error('ADD MARKS ERROR:', err);
    return res.status(500).send('Server error while adding marks.');
  }
};


const updateStudentMarks = async (req, res) => {
  const { marks, grade } = req.body;

  try {
    let record = await StudentMarks.findById(req.params.Id);

    if (!record) {
      return res.status(404).json({ msg: 'Marks record not found.' });
    }

    const updated = await StudentMarks.findByIdAndUpdate(
      req.params.Id,
      { $set: { marks, grade } },
      { new: true }
    );

    return res.json(updated);
  } catch (err) {
    console.error('UPDATE MARKS ERROR:', err.message);
    return res.status(500).send('Server error');
  }
};

module.exports = {
  getMarksByStudent,
  getMarksByCourse,
  addStudentMarks,
  updateStudentMarks
};

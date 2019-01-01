const mongoose = require('mongoose');

// Connect to mongodb
mongoose
  .connect(
    'mongodb://localhost/playground',
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to mongodb...'))
  .catch(err => console.log('Could not connect to mongodb', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

// Create model based on schema
const Course = mongoose.model('Course', courseSchema);

// Save a course
async function createCourse() {
  const course = new Course({
    name: 'Angular js',
    author: 'Sandeep',
    tags: ['angular', 'frontend'],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

// Quering
async function getCourses() {
  const courses = await Course.find();
  console.log(courses);
}

getCourses();

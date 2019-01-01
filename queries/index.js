const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb://localhost/test',
    { useNewUrlParser: true }
  )
  .then(() => console.log('connected to mongodb..'))
  .catch(err => console.log('could not connect to mongodb.', err));

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Advance CSS',
    author: 'Robot',
    tags: ['frontend', 'static'],
    isPublished: true,
    price: 10
  });

  const result = await course.save();
  console.log(result);
}

// Get courses with author: 'Sandeep' and isPublished: true with limit of 4 and sort by name in ascending order with only name and tags fields.
async function getCourses() {
  const courses = await Course.find({
    author: 'Sandeep',
    isPublished: true
  })
    .limit(4)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

/* -------------------- Comparision Query Operators -------------------- */

// Courses with 10 dollars
async function getCoursesTwo() {
  const courses = await Course.find({
    price: 10
  });
  console.log(courses);
}

// Courses b/w 10 to 20
async function getCoursesThree() {
  const courses = await Course.find({
    price: { $gte: 10, $lte: 20 }
  });
  console.log(courses);
}

// Courses that are 15, 20 and 25
async function getCoursesThree() {
  const courses = await Course.find({
    price: { $in: [15, 20, 25] }
  });
  console.log(courses);
}

/* -------------------- Logical Query Operators -------------------- */

// Courses that are author by Robot or Published
async function getCoursesFour() {
  const courses = await Course.find().or([
    { author: 'Robot' },
    { isPublished: true }
  ]);
  console.log(courses);
}

// Courses that are author by Robot and Published
async function getCoursesFive() {
  const courses = await Course.find().and([
    { author: 'Robot', isPublished: true }
  ]);
  console.log(courses);
}

/* -------------------- Regular Expressions -------------------- */

// Courses that are author starts by 'san'
async function getCoursesSix() {
  const courses = await Course.find({ author: /^san/i });
  console.log(courses);
}

// Courses that are author ends by 't'
async function getCoursesSeven() {
  const courses = await Course.find({ author: /t$/i });
  console.log(courses);
}

// Courses with author name contains 'and'
async function getCoursesEight() {
  const courses = await Course.find({ author: /.*and.*/i });
  console.log(courses);
}

/* -------------------- Counting -------------------- */

// Count the number of courses that are 25 and 10 dollars with published.
async function getCoursesNine() {
  const courses = await Course.find({ price: { $in: [25, 10] } })
    .and({
      isPublished: true
    })
    .count();
  console.log(courses);
}

getCoursesNine();

/* -------------------- Note  -------------------- */
// Comparision Operators
/*
eq --> equal
ne --> not equal
gt --> greater than
gte --> greater than or equal to
lt --> less than
lte --> less than or equal to
in --> in
nin --> not in
*/

// Logical Operators
/*
or
and
*/

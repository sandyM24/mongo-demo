const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb://localhost/test',
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to mongodb...'))
  .catch(err => console.log('Something went wrong.', err));

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

/* ------------------------------------------------------------------------ */
/* Updating Queries */
/* ------------------------------------------------------------------------ */
async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;

  course.set({
    isPublished: true,
    author: 'Sandeep Bansal'
  });

  const result = await course.save();
  console.log(result);
}

async function updateCourseTwo(id) {
  const result = await Course.update(
    { _id: id },
    {
      // Here we will use mongodb update operator check mongodb reference for more info.
      $set: {
        author: 'Sandy',
        isPublished: false
      }
    }
  );

  console.log(result);
}

async function updateCourseThree(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: 'Jack and will',
        isPublished: true
      }
    },
    { new: true }
  );

  console.log(course);
}

updateCourseThree('5c2b090656e4de029cb91afb');

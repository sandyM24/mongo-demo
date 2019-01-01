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
/* Remove Queries */
/* ------------------------------------------------------------------------ */
async function removeCourse(id) {
  // const result = await Course.deleteOne({ _id: id });
  // const result = await Course.deleteMany({ _id: id });
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}

removeCourse('5c2b090656e4de029cb91afb');

const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb://localhost/playground',
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to mongodb...'))
  .catch(err => console.log('Could not connect to mongodb', err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
    // match: /pattern/
  },
  category: {
    type: String,
    enum: ['web', 'mobile', 'network'],
    required: true
  },
  author: String,

  // Custom validation
  /*
  tags: {
    type: Array,
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'Course should have atleast 1 tag'
    }
  },
  */

  // Async Validation
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function(v, callback) {
        setTimeout(() => {
          callback(v && v.length > 0);
        }, 4000);
      },
      message: 'Course should have atleast 1 tag'
    }
  },

  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    },
    min: 5,
    max: 100
  }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Python',
    category: 'web',
    author: 'Sandeep',
    tags: [],
    isPublished: true,
    price: 50
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}

createCourse();

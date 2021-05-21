const router = require('express').Router();
let Student = require('../models/student.model');


//home 
router.route('/').get((req, res) => {
    Student.find()
        .then(student => res.json(student))
        .catch(error => res.status(400).json("Error:" + error));
})


router.route('/:id').get((req, res) => {
    Student.findById(req.params.id)
        .then(student => res.json(student))
        .catch(err => res.status(400).json('Error: ' + err));
});

//add
router.route('/add').post((req, res) => {
    const fullname = req.body.fullname;
    const email = req.body.email;


    const newStudent = Student({ fullname, email });
    console.log(req.body);
    newStudent.save()
        .then(student => res.json("New student added"))
        .catch(error => res.status(400).json("Error: " + error));
})


//update

router.route('/update/:id').post((req, res) => {
    Student.findById(req.params.id)
        .then(student => {
            student.fullname = req.body.fullname;
            student.email = req.body.email;

            student.save()
                .then(student => res.json("Record was updated."))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// router.route("/update").put(function(req, res) {
//     Student.updateOne({ fullname: "Dexter Tampioc" }, { fullname: "Papang Tampioc" }, function(
//         err,
//         result
//     ) {
//         if (err) {
//             res.send(err);
//         } else {
//             res.json(result);
//         }
//     });
// });

//delete

router.route('/:id').delete((req, res) => {
    Student.findByIdAndDelete(req.params.id)
        .then(student => res.json("Record was Deleted."))
        .catch(err => res.status(400).json('Error: ' + err));
})

// Student.deleteOne({ fullname: 'Papang Tampioc' }, function(err) {
//     if (err) console.log(err);
//     console.log("Successful deletion");
// });



module.exports = router;
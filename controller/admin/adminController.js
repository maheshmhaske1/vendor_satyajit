
const bcrypt = require('bcryptjs');
const adminUsers = require('../../model/admin/adminUser.model');
const jwt = require('jsonwebtoken');


// ---------register---------------------//
exports.register = async (req, res) => {


    console.log(req.body)

    const { username, password, name, mobile_number, email, user_status } = req.body;
    const existingUser = await adminUsers.findOne({ username:username, status:true });
    if (existingUser) {
        return res.json({
            status: false,
            message: "Username already exists"
        })
    }
    new adminUsers({ username, password, name, mobile_number, email, user_status })
        .save()
        .then(data => {
            return res.json({
                status: true,
                data: data,
                message: "User register successfully..!"
            })
        })
        .catch(err => {
            console.log(err)
            return res.json({
                status: false,
                data: err,
                message: "Somethings went wrong...!"
            })
        })



}

// ---------login ----------------------//
exports.login = async (req, res) => {

    const { username, password } = req.body;
    const adminUser = await adminUsers.findOne({ username:username, status:true });
    if (!adminUser) {
        return res.json({
            status: false,
            message: "Invalid username or password"
        })
    }
    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) {
        return res.json({
            status: false,
            message: "Invalid username or password"
        })
    }
    const token = jwt.sign({ userId: adminUser._id }, 'secret-key', { expiresIn: '1d' });

    return res.json({
        status: true,
        data: adminUser,
        message: "User login successfully..!",
        token: token
    })


}

// ----------list all admin-------------//
exports.list_admin = async (req, res) => {

    adminUsers.find({ status: true })
        .then((data) => {
            return res.json({
                status: true,
                data: data,
                message: "admin list"
            })
        })
        .catch(err => {
            console.log(err)
            return res.json({
                status: false,
                data: err,
                message: "Somethings went wrong...!"
            })
        })

}

// ----------update_admin---------------//
exports.update_admin = async (req, res) => {
    const { username, name, mobile_number, email, user_status, password } = req.body;
    adminUsers.findByIdAndUpdate({ _id: req.params.id }, {
        username, name, mobile_number, email, user_status, password
    })
        .then((data) => {
            return res.json({
                status: true,
                data: data,
                message: "Record update successfully..!"
            })
        })
        .catch(err => {
            console.log(err)
            return res.json({
                status: false,
                data: err,
                message: "Somethings went wrong...!"
            })
        })

}

// -----------delete_admin------------//
exports.delete_admin = async (req, res) => {

    adminUsers.findByIdAndUpdate({ _id: req.params.id }, {
        status: false
    })
        .then((data) => {
            return res.json({
                status: true,
                data: data,
                message: "Record delete successfully..!"
            })
        })
        .catch(err => {
            console.log(err)
            return res.json({
                status: false,
                data: err,
                message: "Somethings went wrong...!"
            })
        })

}


// ----------list all admin-------------//
exports.list_admin_by_role = async (req, res) => {

    adminUsers.find({ status: true,user_status:req.params.id })
        .then((data) => {
            return res.json({
                status: true,
                data: data,
                message: "admin list"
            })
        })
        .catch(err => {
            console.log(err)
            return res.json({
                status: false,
                data: err,
                message: "Somethings went wrong...!"
            })
        })

}
import mongoose from 'mongoose';
const { Schema } = mongoose;


const userSchema = new Schema({
    name: String,
    email: String,
    password: String
});

const Users = mongoose.models.admindata || mongoose.model('admindata', userSchema);
export default Users;
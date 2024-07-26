
import connectDB from "../../lib/db";
import bcrypt from 'bcrypt';
import Users from "../../lib/model/user";

connectDB()
export async function POST(request) {

    const { email, password } = await request.json();

    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
        // return new Response(data, {
        //     message: 'Email is already taken',
        //     status: 400,
        // });
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Data ', email, '   ', password, '   ', hashedPassword);
    
        // If user is created successfully, return a success message
        const users = await Users.create({ email, password: hashedPassword });
    
        let data = JSON.stringify(users);
        console.log('users ', users);
        return new Response(data, {
            status: 200,
        });
    }else{
        return new Response(JSON.stringify({ message: 'Email is already taken' }), {
            status: 400,
        });
    }
    // Hash the password before storing it in the database
   

    // try {
    //     const users = await Users.create({ email, password: hashedPassword });
        
    //     return new Response(users, {
    //         status: 200,
    //     });
    // } catch (error) {
    //     console.error('Error creating user:', error);
    //     return new Response(JSON.stringify({ message: 'Failed to create user' }), {
    //         status: 500,
    //     });
    // }

}
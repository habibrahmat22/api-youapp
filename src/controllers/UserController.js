import UserService  from '../services/UserService'
import bcrypt from 'bcrypt'
import Util from '../utils/Utils'
import jwt from 'jsonwebtoken'

const util = new Util();

class UserController {

    static async getAllUsers(req, res) {
        try {
            const allUsers = await UserService.getAllUsers();
            if(allUsers.length > 0){
                util.setSuccess(200, 'users found', allUsers);
            }else{
                util.setSuccess(200,'Users not found');
            }
            return util.send(res)
        } catch (error) {
            util.setError(400, error);
            return util.send(res)
        }
    }

    static async addUser(req, res){
        if(!req.body.username || !req.body.password || !req.body.email){
            util.setError(400, 'Please provide complete details');
            return util.send(res)
        }
        const newUser = req.body;
        await bcrypt.hash(newUser.password, 10, async (err, hash) =>{
            if(err){
                util.setError(400,err);
                return util.send(res)
            }
            try {
                newUser.password = await hash
                const cekEmail = await UserService.cekEmail(res,newUser.email);
                const emailExist = (cekEmail.length) >= 1
                if(emailExist){
                    util.setError(400, 'email already exist');
                    return util.send(res)
                }
                const createdUser = await UserService.addUser(res,newUser);
                util.setSuccess(201, 'User Added', createdUser);
                return util.send(res);
            } catch (error) {
                util.setError(400, error.message);
                return util.send(res);
            }  
        })
       
    }

    static async updatedUser(req, res){
        const findUser = req.body;
        const {id} = req.params;
        if(!Number(id)){
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res)
        }
        try {
            const updateUser = await UserService.updateUser(id, findUser);
            if(!updateUser){
                util.setError(404, `Cannot find user with the ${id}`);
            }else{
                util.setSuccess(200, 'User updated', updateUser)
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getAUser(req, res) {
        const {id} = req.params;
        if(!Number(id)){
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const theUser = await UserService.getAUser(id);
            if(!theUser){
                util.setError(404, `Cannot find user with the id ${id}`);
            }else{
                util.setSuccess(200, 'User Found', theUser);
            }
            return util.send(res)
        } catch (error) {
            util.setError(404,error);
            return util.send(res)
        }
    }

    static async deleteUser (req, res){
        const {id} = req.params;

        if(!Number(id)){
            util.setError(400, 'Please provide a numeric value');
            return util.send(res);
        }
        try {
            const userToDelete = await UserService.deleteUser(id);
            if(userToDelete){
                util.setSuccess(200, 'User deleted');
            }else{
                util.setError(404, `User with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res)
        }
    }

    static async loginUser (req, res){
        const {username,password} = req.body
        try {
            const cekUserLogin = await UserService.loginUser(username)
            if(!cekUserLogin){
                util.setError(400,'Username is not exist');
            }else{
                const match = await bcrypt.compare(password, cekUserLogin.password);
            if(match){
                const token = {
                    id: cekUserLogin.id,
                    username : cekUserLogin.username,
                    token: jwt.sign(
                      {
                        email: cekUserLogin.email,
                        id: cekUserLogin.id
                      },
                      process.env.JWT_KEY,
                      { expiresIn: '12h' }
                    )
                  }
                  util.setSuccess(200, 'Login Success', token);
            }else{
                util.setError(400,'Your Password is wrong!')
            }
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res)
        }
    }
    static async uploadUser(req, res){
        const {id} = req.params;
        const body_user = req.body;
        body_user.img_url = req.file.filename;
        try {
            const update_status = await UserService.uploadUser(id,body_user);
            if(!update_status){
                util.setError(404, `Cannot find user with id = ${id}`);
            }else{
                if(body_user.img_url == undefined){
                    util.setError(404, 'img_url is required');
                }else{
                    if (body_user.img_url){
                        util.setSuccess(200, 'Upload Success', update_status)
                    }else {
                        util.setSuccess(200, 'Upload Failed', update_status)
                    }
                }
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }
}
export default UserController


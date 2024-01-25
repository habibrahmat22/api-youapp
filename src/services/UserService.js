import database from '../models';
import Util from '../utils/Utils'

const util = new Util();
const { user } = database;

class UserService {
    static async getAllUsers(){
        try {
            return await user.findAll();
        }catch(error){
            throw error;
            
        }
    }

    static async cekEmail (res,email) {
        try {
            return await user.findAll({where:{email:email}})
        } catch (error) {
            throw error
        }
    }
    static async addUser(res,newUser) {
        try {
            return await user.create(newUser);
        } catch (error) {
            throw error
        }
    }

    static async updateUser(id, updateUser) {
        try {
            const userToUpdate = await user.findOne({
                where : {id: Number(id)}
            })
            if(userToUpdate) {
                await user.update(updateUser, {where: {id:Number(id)}})

                return updateUser;
            }
        } catch (error) {
            throw error
        }
    }

    static async getAUser(id) {
        try {
            const theUser = await user.findOne({
                where : {id:Number(id)}
            })
            return theUser
        }catch(error){
            throw error;
        }
    }

    static async loginUser(username) {
        try {
            const findEmail = await user.findOne({where : {
                username :username
            }})
            return findEmail
        } catch (error) {
            throw error;
        }
    }
    static async deleteUser(id) {
        try {
           const userToDelete = await user.findOne({where : Number(id)})
               if(userToDelete){
                   const deleteUser = await user.destroy({
                       where : {id:Number(id)}
                   })
                   return deleteUser;
               } 
        } catch (error) {
            throw error
        }
    }
    static async uploadUser(id, body_user) {
        try {
          const userToUpdate = await user.findOne({
            where: { id: Number(id) }
          });
          if (userToUpdate) {
            await user.update(body_user, { where: { id: Number(id) } });
            return body_user;
          }
        } catch (error) {
          throw error;
        }
      }
}
export default UserService
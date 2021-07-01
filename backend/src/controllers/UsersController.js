const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');
const { v4: uuid } = require('uuid');
module.exports = {
    async index(request,response){
        const users = await connection('users').select('*').innerJoin('address', 'users.id', '=', 'address.user_id');
        return response.json(users);
    },

    async create(request, response){
        const {name, email, phone, street, district, number} = request.body;
        const regexEmail = /\S+@\S+\.\S+/;
        const regexPhone = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/;
        const regexName = /^[a-z ,.'-]+$/i;
        const ddd = phone.substring(0,2);
        const number1 = phone.substring(2,7);
        const number2 = phone.substring(7,13);
        const numberPhoneForValidation = `(${ddd}) ${number1}-${number2}`
        const id = generateUniqueId();

        if(!name || !regexName.test(name)){
            return response.status(400).json("Name incorrect");
        }

        if(!email || !regexEmail.test(email)){
            return response.status(400).json("Email incorrect");
        }

        if(!phone || !regexPhone.test(numberPhoneForValidation)){
            return response.status(400).json("Phone incorrect");
        }

        const userExists = await connection('users').where('email', email).select('*').first();
        const userExistsPhone = await connection('users').where('phone', phone).select('*').first();

        if(userExists || userExistsPhone){
            return response.status(400).json('User already exists');
        }

        await connection('users').insert({
            id,
            name,
            email,
            phone
        });

        const user = await connection('users').where('id',id).select('*').first();

        await connection('address').insert({
            id: uuid(),
            street,
            district,
            number,
            user_id: user.id
        });


        return response.json('Usuário cadastrado com sucesso!');

    },

    async update(request, response){
        const {id} = request.params;
        const {name, email, phone, street, district, number} = request.body;

        const regexEmail = /\S+@\S+\.\S+/;
        const regexPhone = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/;
        const regexName = /^[a-z ,.'-]+$/i;
        const ddd = phone.substring(0,2);
        const number1 = phone.substring(2,7);
        const number2 = phone.substring(7,13);
        const numberPhoneForValidation = `(${ddd}) ${number1}-${number2}`

        if(!name || !regexName.test(name)){
            return response.status(400).json("Name incorrect");
        }

        if(!email || !regexEmail.test(email)){
            return response.status(400).json("Email incorrect");
        }

        if(!phone || !regexPhone.test(numberPhoneForValidation)){
            return response.status(400).json("Phone incorrect");
        }

        await connection('users').where('id',id).update({
            name,
            email,
            phone
        });

        await connection('address').where('user_id',id).update({
            street,
            district,
            number
        });

        return response.json('Usuário atualizado com sucesso');
    },

    async delete(request, response){
        const {id} = request.params;

        await connection('users').where('id',id).delete();
        await connection('address').where('user_id',id).delete();

        return response.json({message:'Usuário deletado com sucesso!'});
    }
};
import createHttpError from "http-errors";
import path from 'node:path';
import jwt from 'jsonwebtoken'
import fs from 'node:fs/promises';
import bcrypt from "bcrypt";
import handlebars from 'handlebars';
import User from "../db/models/User.js";
import { hashValue } from "../utils/hash.js";
import { SMTP } from '../constants/constants.js';
import { sendEmail } from '../utils/sendMail.js';
import { TEMPLATES_DIR } from "../constants/contacts.js";
import  env  from '../utils/env.js';



export const findUser = filter => User.findOne(filter);
export const signup = async (data) => {
    const {password} = data;
    const hashPassword = await hashValue(password);
    return User.create({...data, password: hashPassword});
};
    
    
export const requestResetToken = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw createHttpError(404, 'User not found')
    }

    const resetToken = jwt.sign(
        {
            sub: user._id,
            email,
        },
        env('JWT_SECRET'),
        {
            expiresIn: '5m'
        }
    );

    const resetPasswordTemplatePath = path.join(
        TEMPLATES_DIR,
        'reset-password.html',
    );

    const templateSource = (
        await fs.readFile(resetPasswordTemplatePath)
    ).toString();

    const template = handlebars.compile(templateSource);
    const html = template({
        name: user.name,
        link: `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`
    })

    try {
        await sendEmail({
        from: env(SMTP.SMTP_FROM),
        to: email,
        subject: 'Reset you password',
        html,
    });
    } catch (error) {
        throw createHttpError(500, 'Failed to send the email, please try again later.', error);
    }
    
};

export const resetPassword = async (payload) => {
    let entries;


    try {
        entries = jwt.verify(payload.token, env('JWT_SECRET'));
    } catch (error) {
            throw createHttpError(401, "Token is expired or invalid."); 
    }

    const user = await User.findOne({
        email: entries.email,
        _id: entries.sub,
      });
    
      if (!user) {
    
        throw createHttpError(404, 'User not found');
    }
    const encryptedPassword = await bcrypt.hash(payload.password, 10)

    await User.updateOne(
        {_id: user._id},
        {password: encryptedPassword},
    );
};
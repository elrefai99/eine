import jwt from 'jsonwebtoken';

const maxAge = 30 * 24 * 60 * 60;
const TokenId = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: maxAge});
}

export {TokenId, maxAge};
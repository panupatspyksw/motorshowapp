const Joi = require("joi").extend(require('@joi/date'));
const post = require('./index')
const joivalidation = require('../middleware/joischemavalidation')

module.exports.newpost = Joi.object().keys({
    title : post.title,
    category : post.category,
    tags : post.tags,
    cover : post.cover,
    short : post.short,
    detail : post.detail,
    visible : post.visible,

})


module.exports.editpost = Joi.object().keys({
    id: post.id,
    title : post.title,
    category : post.category,
    tags : post.tags,
    cover : post.cover,
    short : post.short,
    detail : post.detail,
    visible : post.visible,

})
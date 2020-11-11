module.exports = (sequelize,DataTypes) => {
    const gig = sequelize.define(
        'gig',{
            title : {
                type : DataTypes.STRING
            },
            technologies : {
                type : DataTypes.STRING
            },
            budget : {
                type : DataTypes.STRING
            },
            description : {
                type : DataTypes.STRING
            },
            contact_email : {
                type : DataTypes.STRING
            }
        }
    )
    return gig
}
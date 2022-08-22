import { Sequelize, Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './mock.db'
});

interface ContactsModel extends Model<InferAttributes<ContactsModel>, InferCreationAttributes<ContactsModel>> {
    _id:CreationOptional<number>
    name:string
    email:string
    phone:string
    avatar:string
}

export const Contacts = sequelize.define<ContactsModel>('Contacts', {
    _id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    name: {
        type:DataTypes.STRING,
        allowNull:false
    },
    email: {
        type:DataTypes.STRING,
        allowNull:false
    },
    phone: {
        type:DataTypes.STRING,
        allowNull:false
    },
    avatar: {
        type:DataTypes.STRING,
        allowNull:false
    },
});

testConnection();

async function testConnection() {
    try {
        await sequelize.authenticate();
        await Contacts.sync();
        console.log('DB Connected.')
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
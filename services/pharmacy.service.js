// user.service.js

const dayjs = require('dayjs');
const {
	ServiceBroker
} = require("moleculer");
const DbService = require("moleculer-db");
const MongoDBAdapter = require("moleculer-db-adapter-mongo");


module.exports = {
	name: "pharmacy",



	actions: {
		async bilgiler(ctx) {
			ctx.params.title = "pharmacy.service"
			ctx.params.time = dayjs().toDate()
			ctx.params.env_MONGO_URL = process.env.MONGO_URL

			return ctx.params
		},
		async post(ctx) {

			ctx.params.createdAt = dayjs().toDate();
			delete ctx.params.createdAt;

			return ctx.params
		}
	},
	hooks: {
		before: {
			create: [async (ctx) => {

				//ctx.params.id=new Date().getTime(),
				ctx.params.createdAt = dayjs().toDate()

			}],
			update: [(ctx) => {
				console.log(ctx.params)

				ctx.params.uploadAt = dayjs().toDate()

			}]
		}
	}

}

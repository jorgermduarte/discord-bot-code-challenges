const graphql = require('graphql-request');
const cfg = require('./config.js')
const client = require('../../bot.js');
const discordCfg = require('../../configurations');
const discord = require('discord.js')
const turndown = require('turndown');

const last_submission = {
	date: null
}

const actions = {
	automatic: () => {
		setInterval(function(){
			if(!last_submission.date){
				actions.getQuestion();
				//set date
				last_submission.date = new Date();
			}
			else{
				//verify last date
				let current_time = new Date();
				let last_date = new Date(last_submission.date);
	
				//add 24hours to the last submission
				last_date.setHours(last_date.getHours()+24);
				console.log(current_time,last_date);
				if(current_time >= last_date){
					actions.getQuestion();
					last_submission.date = new Date();
				}else{
					console.log("validated, does not require a new submission yet");
				}
			}
		},3000);
	},
	initialize: () => {
		client.getClient().on('ready',function(){
			console.log(`[CODE-CHALLENGES MODULE] initialized successfully`);
			actions.automatic();
		});
	},
	getQuestion: () => {
		const variables = {
			"categorySlug": "",
			"filters": {
			  "difficulty": "MEDIUM",
			}
		};
		const query = graphql.gql`
		query randomQuestion($categorySlug: String, $filters: QuestionListFilterInput) {
			randomQuestion(categorySlug: $categorySlug, filters: $filters) {
				titleSlug
				questionId
				title
				translatedTitle
				codeDefinition
				content
				translatedContent
				difficulty
				likes
				dislikes
				similarQuestions
				submitUrl
				topicTags {
					name
					slug
					translatedName
					__typename
				}
				codeSnippets {
					lang
					langSlug
					code
					__typename
				}
				stats
				hints
				exampleTestcases
				sampleTestCase
				metaData
				enableRunCode
			}
		}
		`;
		graphql.request(cfg.url, query,variables)
			.then((response) => {
				if(response.randomQuestion)
					actions.submitQuestion(response.randomQuestion)
			});
	},
	submitQuestion(response){
		try{
			const stats = JSON.parse(response.stats);
			let message = new discord.MessageEmbed()
			.setTitle(`${response.title}`)
			.setAuthor(`Professor Moriarty`)
			.setDescription(new turndown().turndown(response.content))
			.setTimestamp()
			.setFooter(`[${response.questionId}] submissions: ${stats.totalSubmission}, acurracy: ${stats.acRate}, automatic-bot(duarte) `,null);
			
			client.getClient().channels.cache.get(discordCfg.channels.code_challange).send({ embeds: [message]});
		
		}catch{

		}

		
	}
};

module.exports = actions;

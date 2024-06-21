import inquirer from 'inquirer';
import chalk from 'chalk'

const apiLink:string = "https://opentdb.com/api.php?amount=6&category=9&difficulty=easy&type=multiple"

let fetchData = async(data:string) => {
    let fetchQuiz :any = await fetch (data)
    let res = await fetchQuiz.json()
    return res.results;
}

let data = await fetchData(apiLink);

let startQuiz = async () => {
    let score:number=0;

    let name = await inquirer.prompt({
        name:"fname",
        type:'input',
        message:"What is your name ? "
    })
    for(let i=1;i<=5;i++){
        let answers = [...data[i].incorrect_answers,data[i].correct_answer]

        let ans = await inquirer.prompt({
            name:'mcqs',
            type:'list',
            message:data[i].question,
            choices:answers.map((val:any)=>val),
        })
        if(ans.mcqs == data[i].correct_answer){
            ++score
            console.log(chalk.bold.italic.green('correct'))
        }else{
            console.log(`correct answer is ${chalk.bold.redBright(data[i].correct_answer)}`)
        }
    }console.log(`Dear ${chalk.italic.greenBright(name.fname)} your score is ${chalk.bold.yellow(score)} out of 5`)
}


startQuiz();
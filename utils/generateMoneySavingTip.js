const brain = require('brain.js')

function generateMoneySavingTip(expenses, monthlySalary) {
    const categories = [
        'Food and Drinks',
        'Groceries',
        'Rent or Mortgage',
        'Utilities',
        'Transportation',
        'Personal care',
        'Clothing and Accessories',
        'Entertainment',
        'Travel',
        'Gifts and Donations',
        'Medical and Health',
        'Insurance',
        'Education',
        'Home Maintenance and Repairs',
        'Miscellaneous',
    ]

    // Calculate the total amount spent on each category
    const categoryAmounts = {}
    categories.forEach((category) => (categoryAmounts[category] = 0))
    expenses.forEach((expense) => {
        const category = expense.category
        const amount = expense.amount
        categoryAmounts[category] += amount
    })

    // Calculate the weightage of each category based on the total amount spent and monthly salary
    const categoryWeightages = {}
    categories.forEach((category) => {
        const amountSpent = categoryAmounts[category]
        categoryWeightages[category] = amountSpent / monthlySalary
    })

    // Train a neural network to predict the weightage of each category
    const net = new brain.NeuralNetwork({
        inputSize: categories.length,
    })

    const trainingData = categories.map((category) => ({
        input: categoryWeightages[category],
        output: [1],
    }))
    net.train(trainingData)

    // Calculate the final weightage of each category based on the neural network prediction
    const prediction = net.run(Object.values(categoryWeightages))
    const finalWeightages = categories.map((category, i) => ({
        category,
        weightage: prediction[i],
    }))

    const tips = finalWeightages.map(({ category, weightage }) => {
        const amountSpent = categoryAmounts[category]
        const percentOfTotalExpenses = (amountSpent / monthlySalary) * 100
        if (weightage > 0.5) {
            return `You spent very little on ${category} (${percentOfTotalExpenses.toFixed(
                2
            )}% of your monthly salary). Consider spending a bit more on ${category} to enjoy life more.`
        } else if (weightage > 0.25) {
            return `You spent some money on ${category} (${percentOfTotalExpenses.toFixed(
                2
            )}% of your monthly salary). You may want to spend a bit more on ${category} to improve your quality of life.`
        } else if (weightage > 0.1) {
            return `You didn't spend much on ${category} (${percentOfTotalExpenses.toFixed(
                2
            )}% of your monthly salary). Look for ways to spend a bit more on ${category} to enjoy life more.`
        } else if (weightage > 0.05) {
            return `You spent a very small amount on ${category} (${percentOfTotalExpenses.toFixed(
                2
            )}% of your monthly salary). Make sure you're not sacrificing your quality of life by cutting back too much on ${category}.`
        } else if (
            category === 'Hospital' ||
            category === 'Rent or Mortgage' ||
            category === 'Insurance' ||
            category === 'Utilities'
        ) {
            return `You spent a moderate amount on ${category} (${percentOfTotalExpenses.toFixed(
                2
            )}% of your monthly salary). Consider reviewing your expenses in this category to see if there are any opportunities to save money.`
        } else if (percentOfTotalExpenses > 30) {
            return `You spent a lot on ${category} (${percentOfTotalExpenses.toFixed(
                2
            )}% of your monthly salary). Consider reducing your spending on ${category} to save more.`
        } else if (percentOfTotalExpenses > 20) {
            return `You spent quite a bit on ${category} (${percentOfTotalExpenses.toFixed(
                2
            )}% of your monthly salary). Consider reducing your spending on ${category} to save more.`
        } else if (percentOfTotalExpenses > 10) {
            return `You spent some money on ${category} (${percentOfTotalExpenses.toFixed(
                2
            )}% of your monthly salary). Keep an eye on your spending in this category to make sure it doesn't get out of control.`
        } else {
            return `You didn't spend anything on ${category} (${percentOfTotalExpenses.toFixed(
                2
            )}% of your monthly salary). Consider spending a bit on ${category} (${percentOfTotalExpenses.toFixed(
                2
            )}% of your monthly salary). Keep up the good work!`
        }
    })

    // Return a random tip from the generated tips
    return tips[Math.floor(Math.random() * tips.length)]
}
module.exports = generateMoneySavingTip

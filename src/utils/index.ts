function calculateProgress(currentIndex: number, totalIndexes: number, progress: number): number {
    const fractionOfCompletion = (currentIndex / (totalIndexes + 1)) * 100;
    const additionalProgress = progress / (totalIndexes + 1);
    const totalProgress = fractionOfCompletion + additionalProgress;
    return totalProgress;
}

function stringPercentageToNumber(str: string) {
    // Remove the last character
    let newStr = str.slice(0, -1);
    // Convert the resulting string to a number
    let num = Number(newStr);
    return num;
}

export { calculateProgress, stringPercentageToNumber }
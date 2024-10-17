function countVotes(votes){
    let voteCount = 0;
    for(const {vote} of votes.rows)
    {
        voteCount += vote ? 1 : -1;
    }
    return voteCount;
}

module.exports = countVotes;
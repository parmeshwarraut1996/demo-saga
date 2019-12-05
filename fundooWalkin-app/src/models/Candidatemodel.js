class Candidate {
    constructor(codeSkills, comm, createdDate, emailId, gender, hiringType, id, location, mobileNo, name, passion, remark, source, status, updateDate) {

        this.codeSkills = codeSkills,
            this.comm = comm,
            this.createdDate = createdDate,
            this.emailId = emailId,
            this.gender = gender,
            this.hiringType = hiringType,
            this.id = id,
            this.location = location,
            this.mobileNo = mobileNo,
            this.name = name,
            this.passion = passion,
            this.remark = remark,
            this.source = source,
            this.status = status,
            this.updateDate = updateDate

    }
}

module.exports = {
    Candidate
}
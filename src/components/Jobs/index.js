import Cookies from 'js-cookie'
import {Component} from 'react'
import Header from '../Header'
import JobsFilteringSection from '../JobsFilteringSection'
import JobsDetailsSection from '../JobsDetailsSection'
import './index.css'

const newApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    newApiStatus: newApiStatusConstants.initial,
    jobsDetails: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  onSuccessJobsDetails = jobs => {
    this.setState({jobsDetails: jobs})
  }

  getJobs = async () => {
    const {checkedEmployeeList, checkedSalaryRange, searchInput} = this.state
    let concatString
    if (checkedEmployeeList !== undefined) {
      concatString = checkedEmployeeList.join(',')
    }

    const employeeSearch = concatString !== undefined ? concatString : ''
    const salarySearch =
      checkedSalaryRange !== undefined ? checkedSalaryRange : ''
    const search = searchInput !== undefined ? searchInput : ''

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeeSearch}&minimum_package=${salarySearch}&search=${search}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const {jobs} = data
      this.onSuccessJobsDetails(jobs)
    }
  }

  updateState = newState => {
    this.setState(prevState => ({...prevState, ...newState}), this.getJobs)
  }

  render() {
    const {jobsDetails} = this.state
    return (
      <>
        <Header />
        <div className="jobs-main-container">
          <JobsFilteringSection updateState={this.updateState} />
          <JobsDetailsSection jobsDetails={jobsDetails} />
        </div>
      </>
    )
  }
}

export default Jobs

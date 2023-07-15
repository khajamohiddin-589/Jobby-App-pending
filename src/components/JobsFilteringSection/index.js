import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsFilteringSection extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    userProfileDetails: [],
    searchInput: '',
    checkedEmployeeList: [],
    checkedSalaryRange: 0,
  }

  componentDidMount() {
    this.getUserProfileDetails()
  }

  onStateUpdate = () => {
    const {updateState} = this.props
    const newState = this.state

    updateState(newState)
  }

  onClickRetry = () => {
    this.getUserProfileDetails()
  }

  onChangeSalary = event => {
    this.setState({checkedSalaryRange: event.target.id}, this.onStateUpdate)
  }

  onCheckedEmployee = event => {
    const {id, checked} = event.target
    if (checked) {
      const {checkedEmployeeList} = this.state
      if (!(id in checkedEmployeeList)) {
        this.setState(
          prevState => ({
            checkedEmployeeList: [...prevState.checkedEmployeeList, id],
          }),
          this.onStateUpdate,
        )
      }
    } else {
      const {checkedEmployeeList} = this.state
      const newList = checkedEmployeeList.filter(each => each !== id)
      this.setState({checkedEmployeeList: newList}, this.onStateUpdate)
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.onStateUpdate)
  }

  onSuccessUserDetails = profileDetails => {
    this.setState(
      {
        userProfileDetails: profileDetails,
        apiStatus: apiStatusConstants.success,
      },
      this.onStateUpdate,
    )
  }

  onFailureUserDetails = () => {
    this.setState({apiStatus: apiStatusConstants.failure}, this.onStateUpdate)
  }

  getUserProfileDetails = async () => {
    this.setState(
      {apiStatus: apiStatusConstants.inProgress},
      this.onStateUpdate,
    )
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.onSuccessUserDetails(profileDetails)
    } else {
      this.onFailureUserDetails()
    }
  }

  renderUserDetailsAndFiltering = () => {
    const {userProfileDetails, searchInput} = this.state
    const {name, profileImageUrl, shortBio} = userProfileDetails

    return (
      <div className="filtering-main-container">
        <div className="filtering-search-container">
          <input
            value={searchInput}
            onChange={this.onChangeSearchInput}
            type="search"
            placeholder="Search"
            className="filtering-search-input-mobile-view"
          />
          <button type="button" className="icon-button">
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="user-profile-card">
          <div className="text-details-container">
            <img className="profile-icon" src={profileImageUrl} alt={name} />
            <h1 className="profile-username">{name}</h1>
            <p className="short-bio">{shortBio}</p>
          </div>
        </div>
        <hr className="line" />
        <ul className="types-of-employees">
          <li>
            <h1 className="employees-types-heading">Type of Employment</h1>
          </li>
          {employmentTypesList.map(each => (
            <li
              onClick={this.toggleChecked}
              key={each.employmentTypeId}
              className="each-employee-checkbox"
            >
              <input
                onChange={this.onCheckedEmployee}
                type="checkbox"
                id={each.employmentTypeId}
                className="employee-checkbox"
              />
              <label htmlFor={each.employmentTypeId} className="employee-label">
                {each.label}
              </label>
            </li>
          ))}
        </ul>
        <hr className="line" />
        <ul className="types-of-employees">
          <li>
            <h1 className="employees-types-heading">Salary Range</h1>
          </li>
          {salaryRangesList.map(each => (
            <li key={each.salaryRangeId} className="each-employee-checkbox">
              <input
                name="radio"
                onChange={this.onChangeSalary}
                type="radio"
                id={each.salaryRangeId}
                className="employee-checkbox"
              />
              <label htmlFor={each.salaryRangeId} className="employee-label">
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderUserProfileFailure = () => {
    const {searchInput} = this.state

    return (
      <div className="filtering-main-container">
        <div className="filtering-search-container">
          <input
            value={searchInput}
            onChange={this.onChangeSearchInput}
            type="search"
            placeholder="Search"
            className="filtering-search-input-mobile-view"
          />
          <button type="button" className="icon-button">
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="button-container">
          <button
            onClick={this.onClickRetry}
            type="button"
            className="user-profile-retry-button"
          >
            Retry
          </button>
        </div>

        <hr className="line" />
        <ul className="types-of-employees">
          <li>
            <h1 className="employees-types-heading">Type of Employment</h1>
          </li>
          {employmentTypesList.map(each => (
            <li
              onClick={this.toggleChecked}
              key={each.employmentTypeId}
              className="each-employee-checkbox"
            >
              <input
                onChange={this.onCheckedEmployee}
                type="checkbox"
                id={each.employmentTypeId}
                className="employee-checkbox"
              />
              <label htmlFor={each.employmentTypeId} className="employee-label">
                {each.label}
              </label>
            </li>
          ))}
        </ul>
        <hr className="line" />
        <ul className="types-of-employees">
          <li>
            <h1 className="employees-types-heading">Salary Range</h1>
          </li>
          {salaryRangesList.map(each => (
            <li key={each.salaryRangeId} className="each-employee-checkbox">
              <input
                name="radio"
                onChange={this.onChangeSalary}
                type="radio"
                id={each.salaryRangeId}
                className="employee-checkbox"
              />
              <label htmlFor={each.salaryRangeId} className="employee-label">
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="filtering-main-container" id="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const newState = this.state

    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderUserDetailsAndFiltering()
      case apiStatusConstants.failure:
        return this.renderUserProfileFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default JobsFilteringSection

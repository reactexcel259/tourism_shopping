import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import Trash from "../../images/trash.svg";
import { Link } from "react-router-dom";
import "./company.scss";
import * as actions from "../../redux/actions";
// import Table from 'rc-table';

class Company extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   ApiCall: true
    // };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const { data } = this.props.post;
    // if (this.state.ApiCall && data) {
    //   this.props.getUserPostById(data._id);
    //   this.setState({
    //     ApiCall: false
    //   });
    // }
    // const columns = [{
    //     title: 'Name', dataIndex: 'name', key:'name', width: 100,
    //   }, {
    //     title: 'Age', dataIndex: 'age', key:'age', width: 100,
    //   }, {
    //     title: 'Address', dataIndex: 'address', key:'address', width: 200,
    //   }, {
    //     title: 'Operations', dataIndex: '', key:'operations', render: () => <a href="#">Delete</a>,
    //   }];
    //   const data = [
    //     { name: 'Jack', age: 28, address: 'some where', key:'1' },
    //     { name: 'Rose', age: 36, address: 'some where', key:'2' },
    //   ];
    return (
      <div className="col-md-8 offset-md-2 col-xs-10 offset-xs-1 companyList">
        {/* <Table columns={columns} data={data} /> */}
        <table className="table table-hover companyTable ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              this.props.userdata.data &&
              data.map((m, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>
                    <Link to={{ pathname: `/companyDetails/${m._id}` }}>
                      {m.title}
                    </Link>
                  </td>
                  <td
                    onClick={() =>
                      this.props.deleteEvent({
                        eventId: m._id,
                        userId: this.props.userdata.data._id
                      })
                    }
                  >
                    <img src={Trash} width="20" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userdata: state.auth.userdata.data,
  post: state.event.postById.data
});

const mapDispatchToProps = dispatch => ({
  deleteEvent: data => dispatch(actions.deleteEventRequest(data))
  // getUserPostById: data => dispatch(actions.getUserPostByIdRequest(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Company);

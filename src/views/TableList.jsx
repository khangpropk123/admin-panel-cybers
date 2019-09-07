/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import './../assets/css/admin.min.css'
import Axios from 'axios'

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button
} from "reactstrap";
const api = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/" 
class Tables extends React.Component {
  constructor(){
    super()
    this.state = {
      data: []
    }
  }
 async componentWillMount() {
    await Axios.post(`${api}get-all-user`).then(data=>{
      this.setState({
        data:data.data
      })
     
    })
    .catch(err=>console.log(err))
    console.log(this.state.data)
   
  }
  setPermit(id){
    let data = new FormData()
    data.append('token','hhhhhhhh')
    data.append('user_id',id)
    return Axios.post(`${api}set-post-permission`,data).then(res=>{
     let permit = 'True'
     if(res.data===false)
      permit='False' 
     document.getElementById('post-permit-'+id).innerText=permit
     console.log(res)
    })
    .catch(err=>console.log(err))
  }
  renderUser = (data)=>{
    return(
      data.map(user=>{
        return(
          <tr>
                        <td><img class='circle' src={user.provider_pic}></img>{" "+user.name}</td>
                        <td>{user._id}</td>
                        <td>{user.point}</td>
                        <td id = {'post-permit-'+user._id}>{user.post_permission ? 'True' : 'False'}</td>
                        <td className="text-center"><Button onClick={()=>{this.setPermit(user._id)}}>Give Permission</Button></td>
            </tr>
        )
      })
    )
  }
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Control Member</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>id</th>
                        <th>Point</th>
                        <th>Post Permission</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
            
                      {this.renderUser(this.state.data)||""}
                      
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Tables;

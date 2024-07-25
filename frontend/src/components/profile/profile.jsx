import React from "react";
import withAuth from "../../withAuth.jsx";
import Layout from "../layout/layout";
const Profile = () =>{
    return (
        <Layout>
        <h1>Profile</h1>
        </Layout>
    )
}
export default withAuth(Profile);
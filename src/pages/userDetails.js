import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaEdit } from "react-icons/fa";

import Loading from "../components/Loading";

import { connect } from "react-redux";
import { updateProfileImage } from "../redux/actions/userActions";

const UserDetails = (props) => {
  const {
    user: {
      loading,
      credentials: { username, imageUrl, zipCode, bio },
    },
  } = props;

  console.log(loading);

  const [userBio, setUserBio] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userZipCode, setUserZipCode] = useState("");

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    const imageData = new FormData();
    imageData.append("image", image, image.name);
    props.updateProfileImage(imageData);
  };

  const uploadImage = () => {
    const file = document.getElementById("profilePicture");
    file.click();
  };

  useEffect(() => {
    if (bio) setUserBio(bio);
    if (zipCode) setUserZipCode(zipCode);
    if (imageUrl) setUserImage(imageUrl);
  }, [props.user.credentials]);

  let userMarkup = loading ? (
    <Loading size={20} color="#f7f7f7" loading={loading} />
  ) : (
    <div>
      <h2>Welcome back, {username}!</h2>
      <div className="imageContainer">
        <img src={imageUrl} alt="profile" />
        <input type="file" id="profilePicture" onChange={handleImageChange} />
        <button className="edit" onClick={uploadImage}>
          <FaEdit />
        </button>
      </div>
      <p>My location: {zipCode}</p>
    </div>
  );

  return (
    <UserContainer>
      {!loading && <h1>My Account</h1>}
      {userMarkup}
    </UserContainer>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { updateProfileImage })(UserDetails);

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 200px;
    position: relative;
  }

  button {
    border: 0;
    background: #f7f7f7;
    height: 1.5rem;
    width: 1.5rem;
    bottom: 0.25rem;
    right: 0.75rem;
    position: absolute;
    border-radius: 50%;
    cursor: pointer;

    svg {
      color: #0d0d0d;
      width: 0.75rem;
    }
  }

  .imageContainer {
    position: relative;
  }

  #profilePicture {
    display: none;
  }
`;

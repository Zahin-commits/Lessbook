const fireMedia = () => {
    setShowProgress(true);
  
    const uploadTasks = [];
  
    if (profilePic) {
      const profilePicRef = ref(storage, `/profile/profile-picture/${profilePic + v4()}`);
      const uploadProfileTask = uploadBytesResumable(profilePicRef, profilePic);
      uploadTasks.push(uploadProfileTask);
  
      uploadProfileTask.on(
        'state_changed',
        (snapshot) => {
          const uploaded = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(uploaded);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  
    if (coverPic) {
      const coverPicRef = ref(storage, `/profile/cover-picture/${coverPic + v4()}`);
      const uploadCoverTask = uploadBytesResumable(coverPicRef, coverPic);
      uploadTasks.push(uploadCoverTask);
  
      uploadCoverTask.on(
        'state_changed',
        (snapshot) => {
          // Track the progress for coverPic upload if needed.
        },
        (error) => {
          console.log(error);
        }
      );
    }
  
    // Use Promise.all to wait for all upload tasks to complete
    Promise.all(uploadTasks)
      .then(() => {
        setShowProgress(false);
        handleUploadComplete();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleUploadComplete = () => {
    const downloadUrls = [];
  
    if (profilePic) {
      getDownloadURL(uploadProfileTask.snapshot.ref).then((profileUrl) => {
        downloadUrls.push(profileUrl);
      });
    }
  
    if (coverPic) {
      getDownloadURL(uploadCoverTask.snapshot.ref).then((coverUrl) => {
        downloadUrls.push(coverUrl);
      });
    }
  
    // Pass downloadUrls to your uploadToDB function as needed
    uploadToDB(...downloadUrls);
  };
  

  /*  const uploadToDB =async({profileUrl,coverUrl})=>{
    try {
 
      console.log(profileUrl,coverUrl);
      // const res = await updateUser({
      //   profilePic:profileImg,
      //   username,
      //   email,
      //   password}).unwrap();
     
      // console.log(res);
  //    dispatch(setCredentials({...res})); 
  
    } catch (error) {
      //console.log(error?.data?.message || error.error)
      console.log(error)
    } 
  }

  const fireMedia = () => {
    setShowProgress(true);
  
    const uploadTasks = [];
  
    if (profilePic) {
      const profilePicRef = ref(storage, `/profile/profile-picture/${profilePic + v4()}`);
      const uploadProfileTask = uploadBytesResumable(profilePicRef, profilePic);
      uploadTasks.push(uploadProfileTask);
  
      uploadProfileTask.on(
        'state_changed',
        (snapshot) => {
          const uploaded = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(uploaded);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  
    if (coverPic) {
      const coverPicRef = ref(storage, `/profile/cover-picture/${coverPic + v4()}`);
      const uploadCoverTask = uploadBytesResumable(coverPicRef, coverPic);
      uploadTasks.push(uploadCoverTask);
  
      uploadCoverTask.on(
        'state_changed',
        (snapshot) => {
          // Track the progress for coverPic upload if needed.
        },
        (error) => {
          console.log(error);
        }
      );
    }
  
    // Use Promise.all to wait for all upload tasks to complete
    Promise.all(uploadTasks)
      .then(() => {
        setShowProgress(false);
        handleUploadComplete();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleUploadComplete = () => {
    const downloadUrls = [];
  
    if (profilePic) {
      getDownloadURL(uploadProfileTask.snapshot.ref).then((profileUrl) => {
        downloadUrls.push(profileUrl);
      });
    }
  
    if (coverPic) {
      getDownloadURL(uploadCoverTask.snapshot.ref).then((coverUrl) => {
        downloadUrls.push(coverUrl);
      });
    }
  
    // Pass downloadUrls to your uploadToDB function as needed
    uploadToDB(...downloadUrls);
  }; */
  
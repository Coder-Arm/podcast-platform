import React, { useState } from 'react'
import InputComponent from '../Input'
import ButtonComponent from '../Button';
import FileInput from '../Input/FileInput';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../Firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { Bars } from 'react-loader-spinner';

const CreatePodcastForm = () => {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [displayImg,setDisplayImg] = useState(null);
    const [bannerImg,setBannerImg] = useState(null);
    const [loading,setLoading] = useState(false);
    const [isCreated,setIsCreated] = useState(false)

   async function handleSubmission(){
    setLoading(true)
        if(!title || !description || !displayImg || !bannerImg ){
            toast.error('Please fill all the fields')
            setLoading(false)
        }
        else if(description.length <= 15){
            toast.error('Description must contain more than 15 letters')
            setLoading(false)
        }
        else {
            try{
            const bannerImgRef = ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`)
            await uploadBytes(bannerImgRef,bannerImg);
              const bannerImgUrl = await getDownloadURL(bannerImgRef);
          
              const displayImgRef = ref(storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`)
              await uploadBytes(displayImgRef,displayImg);
             const displayImgUrl = await getDownloadURL(displayImgRef);

            const podcastData = {
              title,
              description,
              bannerImage : bannerImgUrl,
              displayImage : displayImgUrl,
              createdBy : auth.currentUser.uid
            }
            const docRef = await addDoc(collection(db,'podcasts'),podcastData)

            setTitle('');
            setDescription('');
            setBannerImg(null);
            setDisplayImg(null);
            setLoading(false)
            setIsCreated(true);
            toast.success('Podcast Created Successfully')
              }
              catch(error){
                toast.error(error.message);
              } 
        }
    }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h1>Create Podcast</h1>
      <InputComponent type='text' placeholder='Podcast Title' value={title} setValue={setTitle}/>
      <InputComponent type='text'placeholder='Podcast Description' value={description} setValue={setDescription}/>
      <FileInput text='Import Banner Image' accept='images/*' id='banner-img' handleFile={setBannerImg} isCreated={isCreated} />
      <FileInput text='Import Display Image' accept='images/*' id='display-img' handleFile={setDisplayImg} isCreated={isCreated}/>
      <button className='custom-btn' onClick={handleSubmission}>
        {loading ? <Bars color='white' height='24'/> : 'Create Podcast'}</button>
    </form>
  )
}

export default CreatePodcastForm

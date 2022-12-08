import React, { Component } from "react";
import loginPng from '../images/login.png'
import privacyPng from '../images/security.png'
import logoutPng from '../images/logout.png'
import blogPng from '../images/blog.png'
import legalPng from '../images/legal.png'
import axios from 'axios';
import draftToHtml from 'draftjs-to-html'
import { Editor } from 'react-draft-wysiwyg';
//import { EditorState, convertFromRaw /* convertToRaw */ } from "draft-js";
import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertFromRaw } from 'draft-js';
const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};


axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';


export default class PostPage extends Component {

    constructor(props){
        super(props);
        const contentState = convertFromRaw(content);
        const name = JSON.parse(localStorage.getItem('username'))[0].toUpperCase() + JSON.parse(localStorage.getItem('username')).slice(1);
        const lastname = JSON.parse(localStorage.getItem('userlastname'))[0].toUpperCase() + JSON.parse(localStorage.getItem('userlastname')).slice(1);
        this.state ={title: '', autor: `${name} ${lastname}`, quote:'', text: '', images: [], /* editorState: EditorState.createEmpty(), */ contentState};  //content State JSON 
        
        this.handleTitle = this.handleTitle.bind(this);
        this.handleAutor = this.handleAutor.bind(this);
        this.quoteHandler = this.quoteHandler.bind(this);
        this.imageHandler = this.imageHandler.bind(this);
        this.handleTextArea = this.handleTextArea.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this)
        this.onContentStateChange = this.onContentStateChange.bind(this)
        this.checkImages = this.checkImages.bind(this)
      }
    
      handleTitle(event) {
        this.setState({title: event.target.value})
      }
    
      handleAutor(event) {
        this.setState({autor: event.target.value})
      }

      quoteHandler(event){
        this.setState({quote: event.target.value})
      }

      imageHandler(event) {
        this.setState({image: event.target.value})
      }

      handleTextArea(event) {
        this.setState({text: event.target.value})
      }
    
      handleSubmit(event){
        event.preventDefault();
        console.log('A title was submitted: ' + this.state.title + ' an autor was sent: ' + this.state.autor + ', text: ' + this.state.text)
    
        fetch(`${process.env.REACT_APP_API}/post`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            title: this.state.title,
            autor: this.state.autor,
            quote: this.state.quote,
            article: this.state.contentState,
            images: this.state.images
          })
        })
          .then(response => response.json())
          .then(data => console.log('response from backend server ', data))
        
          //this.props.navigate('/')
    
          //event.preventDefault();
      }

      onEditorStateChange = (editorState) => {
        this.setState({
          editorState
        })
      }

      onContentStateChange = (contentState) => {
        this.setState({
          contentState,
        });
      };

      setImage = async (file) => {
        console.log(file);
/* 
        return new Promise((resolve, reject) => {
          const reader = new window.FileReader();
          console.log(reader);
          reader.onloadend = async () => {
            const form_data = new FormData();
            form_data.append("file", file);
            const res = await uploadFile(form_data);
            setValue("thumbnail", res.data);
            resolve({ data: { link: process.env.REACT_APP_API + res.data } });
          };
          reader.readAsDataURL(file);
        }); */

        return new Promise((resolve, reject) => {
          const reader = new window.FileReader();
          console.log("reader: ", reader);
          reader.onloadend = async () => {
            const formData = new FormData();
            formData.append("file", file);
            
            const image = await axios.post(`${process.env.REACT_APP_API}/postimage`, formData)
            .then(response => {
                                console.log('image pre-set, response: ', response.data);
                                this.setState({images: [...this.state['images'], response.data.url] })
                                return(response.data.url)
                              })
            .catch(err => console.log(err))
    
            //const res = await uploadFile(form_data);
            //setValue("thumbnail", res.data);
            resolve({ data: { link: image } });
          };
          reader.readAsDataURL(file);
        });



      }

      checkImages = () => {
        //this.setState({autor: JSON.parse(localStorage.getItem('username'))})
        //console.log(this.state['images']);
        console.log(this.state.autor)
      }

      /*       onContentStateChange = (contentState) => {
        console.log(this.state.contentState)
        this.setState({
          contentState,
        });
      }; */

  render() {

    //const {editorState} = this.state
    //console.log(editorState);
    //console.log(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
    const { contentState } = this.state;
    console.log(draftToHtml(contentState))


    return (
        <div className="main-profile">
        <aside className="userdata">
            <a href='/profile' className="menu-item"> <img src={loginPng} alt='login' style={{"width": "25px", margin: "0 10px 0 0"}}></img> <span className="user-items item-top">Account</span> </a>
            <a href='/profile' className="menu-item"> <img src={privacyPng} alt='login' style={{"width": "25px", margin: "0 10px 0 0"}}></img> <span className="user-items item-top">Privacy</span> </a>
            <a href='/profile' className="menu-item"> <img src={blogPng} alt='login' style={{"width": "25px", margin: "0 10px 0 0"}}></img> <span className="user-items item-top">Blog's Info</span> </a>
            <a href='/profile' className="menu-item"> <img src={legalPng} alt='login' style={{"width": "25px", margin: "0 10px 0 0"}}></img> <span className="user-items item-top">Policies</span> </a>

            <a href='/' className="menu-item"> <img src={logoutPng} alt='login' style={{"width": "25px", margin: "0 10px 0 0"}}></img> <span className="user-items item-top">logout</span> </a>
        </aside>
        <main className="edit-space">
            <form onSubmit={this.handleSubmit} className='centerForm-login'>
            <h1 className='center' > EDIT POST </h1>            
                <label className='edits' name=" title "> Title </label>             
                <input placeholder="Title" type='text' value={this.state.title} onChange={this.handleTitle} className='input' name="title"/>
                {/* <label className='edits' name="quote">Quote </label>             
                <input  placeholder="| Quote" type='text' value={this.state.quote} onChange={this.quoteHandler} className='input' name="quote"/> */}
                
{/*                 <label className='edits' name=" title "> Content </label>             
 */}                <div className="editor">
                  <Editor
                    //initialContentState={contentState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    onContentStateChange={this.onContentStateChange}

                    //editorState={editorState}
                        //contentState={contentState}
                    //wrapperClassName="wrapper-class"
                    //editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    //onEditorStateChange={this.onEditorStateChange}
                           //onContentStateChange={this.onContentStateChange}
                    toolbar={{
                      inline: { inDropdown: true },
                      list: { inDropdown: true, options: ['unordered', 'ordered'], },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true },
                      blockType: {
                        options: ['Normal', 'H2', 'H3', 'H4', 'H5', 'Blockquote', 'Code'],
                      },
                      options: ['inline', 'blockType', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'image', 'remove', 'history'],
                      colorPicker: {
                        colors: [ 'rgb(0,0,0)', 'rgb(204,204,204)', 'rgb(209,213,216)', 'rgb(163,143,132)', 'rgb(239,239,239)' ],
                      },
                      fontFamily: {
                        options: ['Arial', 'Tahoma', 'Verdana'],
                      },
                      image: {
                        className: undefined,
                        component: undefined,
                        popupClassName: undefined,
                        urlEnabled: true,
                        uploadEnabled: true,
                        alignmentEnabled: true,
                        uploadCallback: this.setImage,
                        previewImage: true,
                        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                        alt: { present: false, mandatory: false },
                        defaultSize: {
                          width: '700px',
                        },
                      },
                    }}
                    //wrapperStyle={<wrapperStyleObject/>}
                    //editorStyle={<editorStyleObject/>}
                    //toolbarStyle={<toolbarStyleObject/>}
                  />
                </div>
{/*                 <textarea
                onChange={this.handleTextArea}
                value={JSON.stringify(contentState, null, 4)}
                style={{width: '1000px', height: '400px'}}
                /> */}
                <input type="submit" value="Submit" className='submit' onClick={this.handleSubmit}/>
              </form>

        </main>
    </div>
    )
  }
}


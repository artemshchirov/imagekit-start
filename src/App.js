import React, { useRef } from 'react';
import { IKContext, IKImage, IKUpload } from 'imagekitio-react';
import './App.css';

const urlEndpoint = process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT;
const publicKey = process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY;
const authenticationEndpoint = process.env.REACT_APP_IMAGEKIT_AUTH_ENDPOINT;

const authenticator = async () => {
  const response = await fetch(authenticationEndpoint);
  const data = await response.json();
  return data;
};

const onError = err => {
  console.log('Error', err);
};

const onSuccess = res => {
  console.log('Success', res);
};

const onUploadProgress = progress => {
  console.log('Progress', progress);
};

const onUploadStart = evt => {
  console.log('Start', evt);
};

function App() {
  const inputRefTest = useRef(null);
  const ikUploadRefTest = useRef(null);

  return (
    <div className='App'>
      <h1>ImageKit React quick start</h1>
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        <h2>Uploading files in React:</h2>
        <p>
          authenticationEndpoint should be implemented in your backend. The SDK makes an HTTP GET
          request to this endpoint and expects a JSON response with three fields i.e. signature,
          token, and expire. Learn how to implement authenticationEndpoint on your server.
        </p>
        <p>Uploaded an image</p>
        <IKUpload
          fileName='test-upload.png'
          onError={onError}
          onSuccess={onSuccess}
        />
        <h2>Upload an image with advanced options</h2>
        <IKUpload
          fileName='test-upload.jpg'
          tags={['sample-tag1', 'sample-tag2']}
          customCoordinates={'10,10,10,10'}
          isPrivateFile={false}
          useUniqueFileName={true}
          responseFields={['tags']}
          validateFile={file => file.size < 2000000}
          folder={'/sample-folder'}
          extensions={[
            {
              name: 'remove-bg',
              options: {
                add_shadow: true,
              },
            },
          ]}
          webhookUrl='https://www.example.com/imagekit-webhook' // replace with your webhookUrl
          overwriteFile={true}
          overwriteAITags={true}
          overwriteTags={true}
          overwriteCustomMetadata={true}
          // customMetadata={{
          //   "brand": "Nike",
          //   "color": "red",
          // }}
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          // style={{ display: 'none' }} // hide the default input and use the custom upload button
          inputRef={inputRefTest}
          ref={ikUploadRefTest}
        />
        <p>Custom Upload Button</p>
        {inputRefTest && <button onClick={() => inputRefTest.current.click()}>Upload</button>}
        <p>Abort upload request</p>
        {ikUploadRefTest && (
          <button onClick={() => ikUploadRefTest.current.abort()}>Abort request</button>
        )}
        <h3>Fetching uploaded file:</h3>
        <IKImage
          path='/test-upload_u_pUzVvXL.png'
          width='200'
        />

        <h2>Advanced file upload</h2>
        <a href='https://docs.imagekit.io/getting-started/quickstart-guides/react#advanced-file-upload'>
          Learn more
        </a>

        <h2>Loading image from relative path:</h2>
        <IKImage
          path='default-image.jpg'
          width='400'
        />
        <h2>Loading image from an absolute path:</h2>
        <IKImage
          src='https://ik.imagekit.io/demo/default-image.jpg'
          width='400'
        />
        <h2>Resize the default image to 200px height and width:</h2>
        <IKImage
          path='default-image.jpg'
          transformation={[
            {
              height: 200,
              width: 200,
            },
          ]}
        />
        <h2>Use the quality parameter to change image quality like this:</h2>
        <IKImage
          path='default-image.jpg'
          transformation={[{ quality: 100 }]}
        />
        <h2>Crop, Crop Modes and Focus:</h2>
        <a href='https://docs.imagekit.io/features/image-transformations/resize-crop-and-other-transformations#crop-crop-modes-and-focus'>
          Learn more
        </a>
        <IKImage
          path='default-image.jpg'
          transformation={[
            {
              height: 300,
              width: 200,
              cropMode: 'extract',
            },
          ]}
        />
        <h2>Chained transformation:</h2>
        <IKImage
          path='default-image.jpg'
          transformation={[
            {
              height: 300,
              width: 200,
            },
          ]}
        />
        <IKImage
          path='default-image.jpg'
          transformation={[
            {
              height: 300,
              width: 200,
            },
            {
              rt: 90,
            },
          ]}
        />
        <IKImage
          path='default-image.jpg'
          transformation={[
            {
              rt: 90,
            },
            {
              height: 300,
              width: 200,
            },
          ]}
        />
        <h2>Adding overlays to image:</h2>
        <IKImage
          path='default-image.jpg'
          transformation={[
            {
              height: 300,
              width: 300,
              overlayText: 'ImageKit',
              overlayTextFontSize: 50,
              overlayTextColor: '0651D5',
            },
          ]}
        />
        <h2>Lazy-loading images in React:</h2>
        <p>
          You should always set the height and width of the image element to avoid layout shift when
          lazy-loading images.
        </p>
        <IKImage
          path='default-image.jpg'
          transformation={[{ height: 300, width: 400 }]}
          loading='lazy'
          height='300'
          width='400'
        />
        <h2>Blurred image placeholder:</h2>
        <p>
          Loading a blurred low quality image placeholder while the original image is being loaded
        </p>
        <IKImage
          path='default-image.jpg'
          lqip={{ active: true, quality: 20 }}
          width='400'
        />
        <h2>Combining lazy loading with low-quality placeholders:</h2>
        <p>
          You have the option to lazy-load the original image only when the user scrolls near them.
          Until then, only a low-quality placeholder is loaded. This saves a lot of network
          bandwidth if the user never scrolls further down.
        </p>
        <p>
          Loading a blurred low quality image placeholder and lazy-loading original when user
          scrolls near them
        </p>
        <IKImage
          path='default-image.jpg'
          transformation={[{ height: 300, width: 400 }]}
          lqip={{ active: true }}
          loading='lazy'
          height='300'
          width='400'
        />
      </IKContext>
    </div>
  );
}

export default App;

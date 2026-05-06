import ImageKit from 'imagekit';
import { config } from 'dotenv'
import path from 'path'
config({path: path.resolve('./config/.env')})

var imagekit = new ImageKit({
    publicKey : process.env.PUBLIC_IMAGEKIT_KEY,
    privateKey :  process.env.PRIVATE_IMAGEKIT_KEY,
    urlEndpoint :  process.env.URL_ENDPOINT
});


export const destroyImage = async (fileId) => {
    if (!fileId || fileId.startsWith('technova/services/srv-')) {
      console.warn('Skipping deletion for invalid or placeholder fileId:', fileId);
      return;
    }

    try {
      const result = await imagekit.deleteFile(fileId);
      console.log('File deleted from ImageKit:', fileId);
      return result;
    } catch (error) {
      // If the error is because the file was already deleted or doesn't exist, we can ignore it
      if (error && (error.$metadata?.httpStatusCode === 404 || error.message?.includes('not found'))) {
        console.warn('Image not found in ImageKit, skipping deletion:', fileId);
        return;
      }
      
      console.error('Error deleting file from ImageKit:', error);
      // We still throw for other errors (like auth issues) so we know something is wrong
      throw new Error('Failed to delete image from ImageKit');
    }
  };
export default imagekit;

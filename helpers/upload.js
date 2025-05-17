const uploadFile = async (filepath) => {
  try {
    const result = await cloudinary.uploader.upload(filepath);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default uploadFile;

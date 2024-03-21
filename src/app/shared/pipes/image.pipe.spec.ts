import { ImagePipe } from './image.pipe';

describe('ImagePipe', () => {
  let pipe: ImagePipe;

  beforeEach(() => {
    pipe = new ImagePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the image URL if it loads successfully', async () => {
    const validImageUrl = 'https://i.blogs.es/cd20cf/1366_2000-9-/1366_2000.jpeg';
    const result = await pipe.transform(validImageUrl);
    expect(result).toBe(validImageUrl);
  });

  it('should return the default image URL if loading fails', async () => {
    const invalidImageUrl = 'https://invalidurl.com/invalid.jpg';
    const result = await pipe.transform(invalidImageUrl);
    expect(result).toBe(pipe['_imgUrlNotImg']);
  });
});

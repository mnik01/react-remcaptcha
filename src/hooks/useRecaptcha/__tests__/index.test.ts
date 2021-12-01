import { renderHook } from '@testing-library/react-hooks';
import { useRecaptcha } from '../index'
import { ConfigV3, RecaptchaVersionEnum } from '../types';

describe('useRecaptcha v3 tests', () => {
  it('should be defined', () => {
    expect(useRecaptcha).toBeDefined();
  });
  const idealKey = 'TODO'

  const config: ConfigV3 = {
    version: RecaptchaVersionEnum.V3,
    apiKey: idealKey,
    onError: () => {},
    onLoad: () => {},
  }

  it('Should render the hook and checks types', () => {
    const { result } = renderHook(() => useRecaptcha(config));

    expect(result.current.execute).toBeDefined()
    expect(result.current.execute).toBeTruthy()
    expect(result.current.execute).toBeInstanceOf(Function)
    expect(typeof result.current.execute).toBe('function');
  });

  it('Should call onLoad', () => {
    // renderHook(() => useRecaptcha(config));
    // const spy = jest.spyOn(config, 'onLoad').mockImplementation(()=>{})
    // expect(spy).toBeCalled()

    // spy.mockReset();
    // spy.mockRestore(); TODO
  });


  it('Should add google script', () => {
  });

  it('Should call onError', () => {
  });
});

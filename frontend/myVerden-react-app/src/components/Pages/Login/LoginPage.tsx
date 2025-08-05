import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Loader2Icon } from 'lucide-react';
import { z } from 'zod';

import bigLogo from '@/assets/myVerden_logo_big.svg';
import loginPagePicture from '@/assets/login_page_picture.png';
import loginPageSketch from '@/assets/login_page_sketch.png';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui/index';
import { useAuthStore } from '@/store/AuthStore';

export interface SpotlightState {
  maskPosX: number;
  maskPosY: number;
  isActive: boolean;
}

const LoginPage = () => {
  const loginPagePictureAlt = 'login_page_picture';
  const loginPageSketchAlt = 'login_page_sketch';
  const bigLogoAlt = 'big_logo';

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [spotlightState, setSpotlightState] = useState<SpotlightState>({
    isActive: true,
    maskPosX: -1000,
    maskPosY: -1000,
  });

  const FormSchema = z.object({
    email: z.email({ message: 'Please enter a valid email address.' }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    console.log(data);
    setTimeout(() => {
      login();
      navigate('/dashboard');
    }, 5000);
  };

  const pageHandleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpotlightState((prev) => (prev.isActive ? { ...prev, maskPosX: x, maskPosY: y } : prev));
  };

  const pageHandleMouseLeave = (_: React.MouseEvent<HTMLDivElement>) => {
    setSpotlightState((prev) => ({
      ...prev,
      maskPosX: -1000,
      maskPosY: -1000,
    }));
  };

  const formHandleMouseEnter = () => {
    setSpotlightState((prev) => ({
      ...prev,
      isActive: false,
      maskPosX: -1000,
      maskPosY: -1000,
    }));
  };

  const formHandleMouseLeave = () => {
    setSpotlightState((prev) => ({
      ...prev,
      isActive: true,
      maskPosX: -1000,
      maskPosY: -1000,
    }));
  };

  return (
    <div
      className='relative w-full h-screen overflow-hidden'
      onMouseMove={pageHandleMouseMove}
      onMouseLeave={pageHandleMouseLeave}
    >
      <img
        src={loginPageSketch}
        alt={loginPageSketchAlt}
        className='w-full h-full absolute inset-0 object-cover'
      />
      <img
        src={loginPagePicture}
        alt={loginPagePictureAlt}
        className='w-full h-full absolute inset-0 object-cover pointer-events-none'
        style={{
          WebkitMaskImage: spotlightState.isActive
            ? `radial-gradient(circle 5rem at ${spotlightState.maskPosX}px ${spotlightState.maskPosY}px, transparent 0, transparent 5rem, white 5rem)`
            : 'none',
          maskImage: spotlightState.isActive
            ? `radial-gradient(circle 5rem at ${spotlightState.maskPosX}px ${spotlightState.maskPosY}px, transparent 0, transparent 5rem, white 5rem)`
            : 'none',
        }}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onMouseEnter={formHandleMouseEnter}
          onMouseLeave={formHandleMouseLeave}
          className='w-2/3 space-y-6'
        >
          <div className='flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/5 w-2/11 h-4/9 primary-glass gap-5 overflow-hidden'>
            <img src={bigLogo} alt={bigLogoAlt} className='p-4 w-full' />
            <div className='px-5 grid w-full items-center gap-3'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='mid-label'>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        className='size-1-5 w-full h-fit input-green-border'
                        type='email'
                        id='email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-[var(--color-destructive-standard)]' />
                  </FormItem>
                )}
              />
            </div>
            <div className='px-5 grid w-full items-center gap-3'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='mid-label'>Password</FormLabel>
                    <FormControl>
                      <div className='relative w-full'>
                        <Input
                          className='size-1-5 w-full h-fit input-green-border pr-10'
                          type={showPassword ? 'text' : 'password'}
                          id='password'
                          {...field}
                        />
                        <button
                          type='button'
                          onClick={() => setShowPassword((prev) => !prev)}
                          className='absolute right-2 top-1/2 transform -translate-y-1/2'
                        >
                          {showPassword ? (
                            <Eye className='w-7 h-7' />
                          ) : (
                            <EyeOff className='w-7 h-7' />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className='text-[var(--color-destructive-standard)]' />
                  </FormItem>
                )}
              />
            </div>
            <div className='px-5 w-fit'>
              <a
                href='/reset-password'
                className='size-1 hover:cursor-pointer text-[var(--color-secondary)] underline underline-offset-1'
              >
                Forgot your password?
              </a>
            </div>
            <div className='px-5 w-fit'>
              <a
                href='/create-account'
                className='size-1 hover:cursor-pointer text-[var(--color-gold)]'
              >
                Create account
              </a>
            </div>
            <div className='px-5 flex flex-row-reverse justify-center  mt-auto pb-8'>
              <Button type='submit' className='primary-button p-1.5 size-1-5 text-white'>
                {isLoading ? <Loader2Icon className='animate-spin' /> : 'LOG IN'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;

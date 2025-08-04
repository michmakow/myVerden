import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Loader2Icon } from 'lucide-react';

import loginPagePicture from '@/assets/login_page_picture.png';
import bigLogo from '@/assets/myVerden_logo_big.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/AuthStore';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const LoginPage = () => {
  const loginPagePictureAlt = 'login_page_picture';
  const bigLogoAlt = 'big_logo';

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    console.log(data);
    setTimeout(() => {
      login();
      navigate('/dashboard');
    }, 5000);
  }

  return (
    <div className='relative w-full h-screen'>
      <img
        src={loginPagePicture}
        alt={loginPagePictureAlt}
        className='w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover'
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
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
                    <FormMessage />
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
                            <Eye className='w-5 h-5' />
                          ) : (
                            <EyeOff className='w-5 h-5' />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='px-5 w-fit'>
              <a href='/reset-password' className='size-1 forgot-link'>
                Forgot your password?
              </a>
            </div>
            <div className='px-5 flex flex-row-reverse justify-center gap-4 mt-auto pb-8'>
              <Button type='submit' className='primary-button p-1.5 size-1-5 text-white'>
                {isLoading ? <Loader2Icon className='animate-spin' /> : 'LOG IN'}
              </Button>
              <Button type='submit' className='primary-button p-1.5 size-1-5 text-white'>
                CREATE
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;

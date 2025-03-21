import React from 'react'
import { Control, FieldPath, FieldValues, useFormState } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { formSchema, signInFormSchema} from '@/zodSchema/Schema';
import { z } from 'zod';

const authFormSchema = formSchema(false)

interface FormInputProps {
    control: Control<z.infer<typeof authFormSchema>> ;
    name: FieldPath<z.infer<typeof authFormSchema>> ;
    type?:string;
    placeholder?:string;
    label?:string;
}

const FormInput = ({ control, name, type = 'text', placeholder, label}: FormInputProps) => {
  const { errors } = useFormState({ control });
  console.log("Checked from form input: ",errors)
  return (
    <FormField 
        control={control}
        name= {name}
        render={({field})=>(
            <FormItem>
                <FormLabel htmlFor={name}>
                    {
                        label ||
                        name.charAt(0).toUpperCase() + name.slice(1)
                    }
                </FormLabel>
                <FormControl>
                    <Input placeholder={placeholder} {...field} type={type}/>
                </FormControl>
                <FormMessage>
                    {errors[name]?.message as string | undefined}
                </FormMessage>
            </FormItem>
        )}
    />
  )
}

export default FormInput
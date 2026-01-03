'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
    Loader2,
    CheckCircle2,
    Calendar,
    User,
    Mail,
    Phone,
    Cake,
    UploadCloud,
    ImageIcon,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { submitCustomCakeQuote } from '@/app/actions/bakery';

// Max file size 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    date: z.string().min(1, 'Date is required'),
    occasion: z.string().min(1, 'Occasion is required'),
    flavor: z.string().min(1, 'Flavor preference is required'),
    weight: z.string().optional(),
    message: z.string().optional(),
    image: z
        .any()
        .optional()
        .refine((files) => !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
            (files) => !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
});

type FormData = z.infer<typeof formSchema>;

export function CustomCakeForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const selectedFile = watch('image');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                alert("File size too large. Max 5MB.");
                return;
            }
            setValue('image', e.target.files);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const removeImage = () => {
        setValue('image', null);
        setPreviewUrl(null);
    };

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('phone', data.phone);
            formData.append('date', data.date);
            formData.append('occasion', data.occasion);
            formData.append('flavor', data.flavor);
            if (data.weight) formData.append('weight', data.weight);
            if (data.message) formData.append('message', data.message);

            if (data.image && data.image.length > 0) {
                formData.append('image', data.image[0]);
            }

            await submitCustomCakeQuote(formData);

            setIsSuccess(true);
            reset();
            setPreviewUrl(null);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <Card className="p-8 text-center bg-green-50/50 border-green-100 dark:bg-green-900/10 dark:border-green-900/30">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 text-green-600">
                    <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                    Request Received!
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Thank you for your custom cake inquiry. We'll review your details and get back to you shortly to confirm your order.
                </p>
                <Button onClick={() => setIsSuccess(false)} variant="outline" className="border-green-200 hover:bg-green-50 hover:text-green-700">
                    Send Another Request
                </Button>
            </Card>
        );
    }

    return (
        <Card className="p-6 md:p-8 bg-card border border-border/50 shadow-sm">
            <div className="mb-8">
                <h3 className="text-2xl font-heading font-bold flex items-center gap-2 mb-2">
                    <Cake className="h-6 w-6 text-primary" />
                    Customize Your Cake
                </h3>
                <p className="text-muted-foreground">
                    Tell us about your dream cake. Upload a reference image if you have one!
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Personal Details */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                <User className="h-3.5 w-3.5" /> Name
                            </Label>
                            <Input
                                id="name"
                                placeholder="Your Name"
                                {...register('name')}
                                className={cn(errors.name && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {errors.name && <p className="text-xs text-red-500">{errors.name.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                <Mail className="h-3.5 w-3.5" /> Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                {...register('email')}
                                className={cn(errors.email && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {errors.email && <p className="text-xs text-red-500">{errors.email.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                <Phone className="h-3.5 w-3.5" /> Phone
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+46..."
                                {...register('phone')}
                                className={cn(errors.phone && "border-red-500 focus-visible:ring-red-500")}
                            />
                            {errors.phone && <p className="text-xs text-red-500">{errors.phone.message as string}</p>}
                        </div>
                    </div>

                    {/* Cake Details */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date" className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                    <Calendar className="h-3.5 w-3.5" /> Date Needed
                                </Label>
                                <Input
                                    id="date"
                                    type="date"
                                    {...register('date')}
                                    className={cn(errors.date && "border-red-500 focus-visible:ring-red-500")}
                                />
                                {errors.date && <p className="text-xs text-red-500">{errors.date.message as string}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="occasion" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                    Occasion
                                </Label>
                                <Input
                                    id="occasion"
                                    placeholder="Birthday, Wedding..."
                                    {...register('occasion')}
                                    className={cn(errors.occasion && "border-red-500 focus-visible:ring-red-500")}
                                />
                                {errors.occasion && <p className="text-xs text-red-500">{errors.occasion.message as string}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="flavor" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                    Flavor/Type
                                </Label>
                                <Input
                                    id="flavor"
                                    placeholder="Chocolate, Vanilla..."
                                    {...register('flavor')}
                                    className={cn(errors.flavor && "border-red-500 focus-visible:ring-red-500")}
                                />
                                {errors.flavor && <p className="text-xs text-red-500">{errors.flavor.message as string}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="weight" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                    Est. Guests/Weight
                                </Label>
                                <Input
                                    id="weight"
                                    placeholder="e.g. 20 guests or 2kg"
                                    {...register('weight')}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description & Image */}
                <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                        <Label htmlFor="message" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                            Details & Special Requests
                        </Label>
                        <Textarea
                            id="message"
                            placeholder="Describe your dream cake design, colors, any text to write on the cake, etc."
                            className="min-h-[100px] resize-y"
                            {...register('message')}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image" className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                            <ImageIcon className="h-3.5 w-3.5" /> Upload Reference Image (Optional)
                        </Label>

                        <div className="mt-2">
                            {previewUrl ? (
                                <div className="relative w-full max-w-[200px] aspect-square rounded-lg overflow-hidden border border-border">
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center w-full">
                                    <label
                                        htmlFor="image-upload"
                                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors border-muted-foreground/25"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <UploadCloud className="w-8 h-8 mb-3 text-muted-foreground" />
                                            <p className="mb-2 text-sm text-muted-foreground">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                SVG, PNG, JPG or GIF (MAX. 5MB)
                                            </p>
                                        </div>
                                        <input
                                            id="image-upload"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting Request...
                        </>
                    ) : (
                        "Request Quote"
                    )}
                </Button>
            </form>
        </Card>
    );
}

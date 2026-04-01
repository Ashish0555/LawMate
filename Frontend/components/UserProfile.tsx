'use client';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone } from 'lucide-react';

interface UserProfileProps {
  name: string;
  email?: string;
  phone?: string;
  role: 'client' | 'lawyer';
  image?: string;
  bio?: string;
  specialty?: string;
}

export function UserProfile({
  name,
  email,
  phone,
  role,
  image,
  bio,
  specialty,
}: UserProfileProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row gap-6">
        <Avatar className="w-20 h-20 flex-shrink-0">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
            {name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground">{name}</h2>
          {specialty && (
            <p className="text-sm text-primary font-medium mt-1">{specialty}</p>
          )}
          {bio && <p className="text-sm text-muted-foreground mt-2">{bio}</p>}

          <div className="mt-4 space-y-2">
            {email && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{email}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{phone}</span>
              </div>
            )}
          </div>

          <div className="mt-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {role === 'lawyer' ? 'Legal Advisor' : 'Client'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

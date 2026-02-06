'use client'

import { useState } from "react";
import Layout from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Camera } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Full-stack developer learning authentication patterns.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update with Prisma
    console.log("Profile updated:", formData);
    setIsEditing(false);
  };

  return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-12 flex items-center justify-between">
            <h1 className="text-4xl font-bold">PROFILE</h1>
            {!isEditing && (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>

          {/* Avatar Section */}
          <div className="mb-10 flex items-center gap-6">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center border-2 border-foreground bg-secondary">
                <User className="h-12 w-12" />
              </div>
              {isEditing && (
                <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center border-2 border-foreground bg-background transition-colors hover:bg-secondary">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{formData.name}</h2>
              <p className="text-muted-foreground">{formData.email}</p>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Personal Information */}
              <div className="border-2 border-border p-6 shadow-sharp">
                <h3 className="mb-6 font-heading text-lg font-bold uppercase tracking-wider">
                  Personal Information
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="flex items-center gap-2 font-heading text-sm uppercase tracking-wider"
                    >
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="flex items-center gap-2 font-heading text-sm uppercase tracking-wider"
                    >
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="bio"
                      className="font-heading text-sm uppercase tracking-wider"
                    >
                      Bio
                    </Label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      value={formData.bio}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="flex w-full border-2 border-border bg-background px-4 py-3 text-sm transition-all duration-150 placeholder:text-muted-foreground focus-visible:border-foreground focus-visible:outline-none focus-visible:shadow-sharp-sm disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="border-2 border-border p-6 shadow-sharp">
                <h3 className="mb-6 font-heading text-lg font-bold uppercase tracking-wider">
                  Security
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center border-2 border-foreground">
                      <Lock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-muted-foreground">
                        Last changed 30 days ago
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" type="button">
                    Change Password
                  </Button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="border-2 border-destructive p-6">
                <h3 className="mb-4 font-heading text-lg font-bold uppercase tracking-wider text-destructive">
                  Danger Zone
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="destructive" size="sm" type="button">
                  Delete Account
                </Button>
              </div>

              {/* Form Actions */}
              {isEditing && (
                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

  );
};

export default Profile;

export type DoctorItem = {
  name?: string;
  short_description?: string;
  small_image?: string;
  image_main?: string;
  instagram?: string;
  facebook?: string;
};

export type ReviewItem = {
  image?: string;
  rating?: number;
  rating_text?: string;
  review_text?: string;
  reviewer_image?: string;
  reviewer_name?: string;
};

export type BranchItem = {
  iframe?: string;
  working_hours?: string;
  address?: string;
};

export type FeatureItem = {
  title?: string;
  description?: string;
  image?: string;
};

export type AvailableDoctor = {
  image?: string;
  name?: string;
  short_description?: string;
};


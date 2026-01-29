import { Star } from "lucide-react";
import type { ReviewItem } from "./types";
import { resolveImageUrl } from "./utils";

type TestimonialsSectionProps = {
  talkDoctorsImages: string[];
  doctorCountText: string;
  reviews: ReviewItem[];
};

export default function TestimonialsSection({
  talkDoctorsImages,
  doctorCountText,
  reviews,
}: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="bg-gradient-to-b from-[#5E6F4C] to-[#4E5E3F] py-16 text-white overflow-hidden">
      <div className="container">
        <div className="flex flex-wrap items-end justify-center gap-6 text-center md:justify-between md:text-left">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold" data-translate="section.patient_testimonials">
              What our patient say about us
            </h2>
          </div>
          <div className="rounded-2xl bg-white/10 px-4 py-3">
            <div className="flex items-center min-h-[36px]">
              {talkDoctorsImages.map((img, index) => (
                <img
                  key={`${img}-${index}`}
                  className="h-9 w-9 rounded-full border border-white object-cover"
                  src={img ?? ""}
                  alt="v-Dental Clinic"
                  width="36"
                  height="36"
                  style={{ marginLeft: index > 0 ? "-8px" : "0", zIndex: talkDoctorsImages.length - index }}
                />
              ))}
            </div>
            <div className="mt-2 text-sm">Talk to over {doctorCountText} doctor</div>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review, index) => (
            <div key={`${review.reviewer_name ?? "review"}-${index}`} className="rounded-3xl bg-white/10 p-6 backdrop-blur min-w-0">
              <img
                className="mb-4 h-12 w-12"
                src={resolveImageUrl(review.image)}
                alt="Testimonial"
                width="48"
                height="48"
                loading="lazy"
                decoding="async"
              />
              <div className="mb-3 flex items-center gap-1 text-[#F8D38E]">
                {Array.from({ length: Number(review.rating ?? 5) }).map((_, starIndex) => (
                  <Star key={`${review.reviewer_name ?? "review"}-${index}-star-${starIndex}`} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <h3 className="text-lg font-semibold break-words">{review.rating_text ?? "Best Treatment"}</h3>
              <p className="mt-3 text-sm text-white/80 break-words">{review.review_text ?? ""}</p>
              <div className="mt-6 flex items-center gap-3">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={resolveImageUrl(review.reviewer_image)}
                  alt="Reviewer"
                  width="40"
                  height="40"
                  loading="lazy"
                  decoding="async"
                />
                <h5 className="text-sm font-semibold break-words">{review.reviewer_name ?? ""}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


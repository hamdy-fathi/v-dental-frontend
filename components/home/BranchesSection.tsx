import { Clock, MapPin } from "lucide-react";
import { extractIframeSrc, normalizeLineBreaks } from "@/lib/unified-data";
import type { BranchItem } from "./types";

type BranchesSectionProps = {
  branches: BranchItem[];
};

export default function BranchesSection({ branches }: BranchesSectionProps) {
  return (
    <section id="branches" className="bg-[#F7F5EA] py-16">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2">
          {branches.map((branch, index) => {
            const iframeSrc = extractIframeSrc(branch.iframe) ?? branch.iframe ?? "";
            const workingLines = normalizeLineBreaks(branch.working_hours) as string[];
            const addressLines = normalizeLineBreaks(branch.address) as string[];

            return (
              <div key={`${iframeSrc}-${index}`} className="overflow-hidden rounded-3xl border border-[#E5E7E0] bg-white shadow-sm">
                {iframeSrc && (
                  <div className="w-full overflow-hidden bg-white">
                    <iframe
                      src={iframeSrc}
                      className="h-full w-full border-0 aspect-[4/3] sm:aspect-[16/10]"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                )}
                <div className="grid gap-6 p-6 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-[#5E6F4C] text-white">
                        <Clock className="h-5 w-5" />
                      </div>
                    <div className="min-h-[96px]">
                      <h5 className="text-sm font-semibold text-[#2F3C2B]" data-translate="branch.working_hours">
                        Working Hours:
                      </h5>
                      <p className="mt-2 text-sm text-[#6C7A65]">
                        {workingLines.map((line: string, lineIndex: number) => (
                          <span key={`${line}-${lineIndex}`}>
                            {line}
                            {lineIndex < workingLines.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A26A] text-white">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="min-h-[96px]">
                      <h5 className="text-sm font-semibold text-[#2F3C2B]" data-translate="branch.office_address">
                        Office Address:
                      </h5>
                      <p className="mt-2 text-sm text-[#6C7A65]">
                        {addressLines.map((line: string, lineIndex: number) => (
                          <span key={`${line}-${lineIndex}`}>
                            {line}
                            {lineIndex < addressLines.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


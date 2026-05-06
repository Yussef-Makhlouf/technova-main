// seed.js
import mongoose from "mongoose";
import dns from "dns";
import { serviceModel } from "./src/DB/models/servicesModel.js";

// Fix for DNS resolution issues with MongoDB SRV records
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const services = [
  {
    customId: "SRV-001",
    slug: "ai-solutions-intelligent-systems",
    name_en: "AI Solutions & Intelligent Systems Development",
    name_ar: "تطوير حلول الذكاء الاصطناعي والأنظمة الذكية",
    shortDescription_en: "Custom AI systems and intelligent automation built for real-world impact.",
    shortDescription_ar: "أنظمة ذكاء اصطناعي مخصصة وأتمتة ذكية مصممة لأثر حقيقي وملموس.",
    description_en: "We design and build custom AI-powered systems tailored to your business needs. From intelligent automation to machine learning pipelines, we deliver end-to-end solutions that integrate seamlessly into your existing infrastructure — enabling smarter decisions, faster operations, and measurable ROI.",
    description_ar: "نصمم وننفذ أنظمة ذكاء اصطناعي مخصصة تتوافق مع احتياجات عملك. من الأتمتة الذكية إلى خطوط معالجة التعلم الآلي، نقدم حلولاً متكاملة تندمج بسلاسة في بنيتك التحتية الحالية — لتمكين قرارات أذكى وعمليات أسرع وعائد استثمار قابل للقياس.",
    features: [
      { feature_en: "Custom LLM & Generative AI integration", feature_ar: "دمج نماذج اللغة الكبيرة والذكاء الاصطناعي التوليدي" },
      { feature_en: "Intelligent process automation (IPA)", feature_ar: "أتمتة العمليات الذكية" },
      { feature_en: "AI model fine-tuning & deployment", feature_ar: "ضبط نماذج الذكاء الاصطناعي ونشرها" },
      { feature_en: "Multi-agent AI system architecture", feature_ar: "تصميم أنظمة الوكلاء المتعددين" },
      { feature_en: "Secure & scalable AI infrastructure", feature_ar: "بنية تحتية آمنة وقابلة للتوسع" }
    ],
    images: [
      { imageLink: "https://placehold.co/800x600?text=AI+Solutions", public_id: "technova/services/srv-001-cover" }
    ]
  },
  {
    customId: "SRV-002",
    slug: "web-application-development",
    name_en: "Web & Application Development",
    name_ar: "تطوير الويب والتطبيقات",
    shortDescription_en: "Scalable, secure web and mobile applications built from idea to launch.",
    shortDescription_ar: "تطبيقات ويب وموبايل قابلة للتوسع ومأمونة، من الفكرة حتى الإطلاق.",
    description_en: "We build high-performance web applications and digital platforms engineered for scale, speed, and security. Our development process spans discovery, architecture, design, and deployment — delivering products that work flawlessly across devices and environments.",
    description_ar: "نبني تطبيقات ويب عالية الأداء ومنصات رقمية مصممة للتوسع والسرعة والأمان. تمتد عملية التطوير لدينا من الاكتشاف والهندسة المعمارية إلى التصميم والنشر — لتسليم منتجات تعمل بكفاءة عبر جميع الأجهزة والبيئات.",
    features: [
      { feature_en: "Next.js & React enterprise web apps", feature_ar: "تطبيقات ويب مؤسسية بـ Next.js و React" },
      { feature_en: "Cross-platform mobile applications", feature_ar: "تطبيقات موبايل متعددة المنصات" },
      { feature_en: "RESTful & GraphQL API development", feature_ar: "تطوير واجهات برمجية REST و GraphQL" },
      { feature_en: "CMS integration & headless architecture", feature_ar: "تكامل أنظمة إدارة المحتوى والهندسة بدون رأس" },
      { feature_en: "Performance optimization & SEO", feature_ar: "تحسين الأداء وتهيئة محركات البحث" }
    ],
    images: [
      { imageLink: "https://placehold.co/800x600?text=Web+Development", public_id: "technova/services/srv-002-cover" }
    ]
  },
  {
    customId: "SRV-003",
    slug: "technical-training-capacity-building",
    name_en: "Technical Training & Capacity Building",
    name_ar: "التدريب التقني وبناء القدرات",
    shortDescription_en: "Practical AI and digital skills training tailored for your team's roles.",
    shortDescription_ar: "تدريب عملي في الذكاء الاصطناعي والمهارات الرقمية مصمم خصيصاً لفريقك.",
    description_en: "We empower your teams with the knowledge and skills needed to leverage AI and digital technologies confidently. Our training programs are practical, role-specific, and designed for both technical and non-technical professionals across government and enterprise sectors.",
    description_ar: "نمكّن فرق عملك بالمعرفة والمهارات اللازمة للاستفادة من الذكاء الاصطناعي والتقنيات الرقمية بثقة. برامجنا التدريبية عملية ومصممة حسب الأدوار، وتستهدف المختصين التقنيين وغير التقنيين في القطاعين الحكومي والمؤسسي.",
    features: [
      { feature_en: "AI literacy & awareness workshops", feature_ar: "ورش توعية ومحو أمية الذكاء الاصطناعي" },
      { feature_en: "Hands-on technical bootcamps", feature_ar: "معسكرات تدريبية تقنية تطبيقية" },
      { feature_en: "Custom LMS & e-learning content", feature_ar: "أنظمة تعلم مخصصة ومحتوى تعليمي إلكتروني" },
      { feature_en: "Leadership AI strategy sessions", feature_ar: "جلسات استراتيجية للذكاء الاصطناعي للقيادات" },
      { feature_en: "Post-training support & assessment", feature_ar: "دعم وتقييم ما بعد التدريب" }
    ],
    images: [
      { imageLink: "https://placehold.co/800x600?text=Training", public_id: "technova/services/srv-003-cover" }
    ]
  },
  {
    customId: "SRV-004",
    slug: "systems-integration",
    name_en: "Systems Integration",
    name_ar: "تكامل الأنظمة",
    shortDescription_en: "Seamless integration of your tools, APIs, and platforms into one ecosystem.",
    shortDescription_ar: "تكامل سلس لأدواتك وواجهاتك البرمجية ومنصاتك في نظام بيئي واحد.",
    description_en: "We connect your disconnected tools, platforms, and data sources into a unified, intelligent ecosystem. Whether bridging legacy systems with modern APIs or orchestrating multi-cloud environments, we ensure your technology stack operates as one cohesive unit.",
    description_ar: "نربط أدواتك ومنصاتك ومصادر بياناتك المتفرقة في نظام بيئي موحد وذكي. سواء كان ذلك بربط الأنظمة القديمة بواجهات برمجية حديثة أو تنظيم بيئات متعددة السحابة، نضمن عمل مجموعة تقنياتك كوحدة متكاملة.",
    features: [
      { feature_en: "Legacy system modernization & bridging", feature_ar: "تحديث الأنظمة القديمة وربطها" },
      { feature_en: "Third-party API & webhook integration", feature_ar: "تكامل واجهات برمجية خارجية و Webhooks" },
      { feature_en: "ERP, CRM & SaaS platform connectivity", feature_ar: "ربط منصات ERP وCRM وSaaS" },
      { feature_en: "Real-time data synchronization", feature_ar: "مزامنة البيانات في الوقت الفعلي" },
      { feature_en: "Multi-cloud & hybrid infrastructure setup", feature_ar: "إعداد البنية التحتية السحابية الهجينة" }
    ],
    images: [
      { imageLink: "https://placehold.co/800x600?text=Systems+Integration", public_id: "technova/services/srv-004-cover" }
    ]
  },
  {
    customId: "SRV-005",
    slug: "advanced-ai-consulting",
    name_en: "Advanced AI Consulting",
    name_ar: "استشارات متقدمة في الذكاء الاصطناعي",
    shortDescription_en: "Strategic AI advisory to define your roadmap and maximize business impact.",
    shortDescription_ar: "استشارات استراتيجية في الذكاء الاصطناعي لتحديد خارطة طريقك وتعظيم أثر أعمالك.",
    description_en: "Our senior AI strategists work alongside your leadership to define a clear AI roadmap, identify high-impact use cases, and build an ethical, governance-ready AI adoption strategy. We translate complex AI concepts into actionable business initiatives.",
    description_ar: "يعمل خبراء الذكاء الاصطناعي الاستراتيجيون لدينا جنباً إلى جنب مع قيادتك لتحديد خارطة طريق واضحة للذكاء الاصطناعي، وتحديد حالات الاستخدام الأعلى أثراً، وبناء استراتيجية اعتماد أخلاقية وجاهزة للحوكمة.",
    features: [
      { feature_en: "AI readiness assessment & audit", feature_ar: "تقييم ومراجعة جاهزية الذكاء الاصطناعي" },
      { feature_en: "Use case discovery & prioritization", feature_ar: "اكتشاف حالات الاستخدام وترتيب أولوياتها" },
      { feature_en: "AI governance & ethics frameworks", feature_ar: "أطر حوكمة وأخلاقيات الذكاء الاصطناعي" },
      { feature_en: "Vendor & model selection guidance", feature_ar: "توجيه اختيار الموردين والنماذج" },
      { feature_en: "Executive AI strategy workshops", feature_ar: "ورش استراتيجية للذكاء الاصطناعي للمستوى التنفيذي" }
    ],
    images: [
      { imageLink: "https://placehold.co/800x600?text=AI+Consulting", public_id: "technova/services/srv-005-cover" }
    ]
  },
  {
    customId: "SRV-006",
    slug: "data-management-analysis",
    name_en: "Data Management & Analysis",
    name_ar: "إدارة البيانات وتحليلها",
    shortDescription_en: "Turn raw data into reliable insights with scalable pipelines and dashboards.",
    shortDescription_ar: "حوّل البيانات الخام إلى رؤى موثوقة عبر خطوط بيانات ولوحات معلومات قابلة للتوسع.",
    description_en: "We help organizations collect, clean, structure, and analyze their data at scale. From building robust data pipelines to designing real-time dashboards, we transform raw, fragmented data into reliable, actionable intelligence that drives confident decision-making.",
    description_ar: "نساعد المؤسسات على جمع بياناتها وتنظيفها وهيكلتها وتحليلها على نطاق واسع. من بناء خطوط بيانات متينة إلى تصميم لوحات معلومات فورية، نحوّل البيانات الخام والمتفرقة إلى ذكاء موثوق وقابل للتنفيذ يدعم اتخاذ القرارات بثقة.",
    features: [
      { feature_en: "Data pipeline design & automation", feature_ar: "تصميم خطوط البيانات وأتمتتها" },
      { feature_en: "Real-time & batch data processing", feature_ar: "معالجة البيانات الفورية والدُفعية" },
      { feature_en: "Data warehousing & lake architecture", feature_ar: "هندسة مستودعات البيانات وبحيرات البيانات" },
      { feature_en: "Interactive BI dashboards (Power BI / Looker)", feature_ar: "لوحات معلومات تفاعلية (Power BI / Looker)" },
      { feature_en: "Data quality & governance frameworks", feature_ar: "أطر جودة البيانات وحوكمتها" }
    ],
    images: [
      { imageLink: "https://placehold.co/800x600?text=Data+Management", public_id: "technova/services/srv-006-cover" }
    ]
  },
  {
    customId: "SRV-007",
    slug: "predictive-modeling-business-intelligence",
    name_en: "Predictive Modeling & Business Intelligence",
    name_ar: "النمذجة التنبؤية وذكاء الأعمال",
    shortDescription_en: "ML-powered forecasting and BI that predicts what's next for your business.",
    shortDescription_ar: "تنبؤات مدعومة بالتعلم الآلي وذكاء أعمال يتوقع مستقبل عملك.",
    description_en: "We build predictive models and BI solutions that don't just report the past — they forecast the future. Using machine learning and statistical analysis, we uncover hidden patterns in your data and deliver foresight that gives your organization a genuine competitive edge.",
    description_ar: "نبني نماذج تنبؤية وحلول ذكاء أعمال لا تقتصر على الإبلاغ عن الماضي — بل تتنبأ بالمستقبل. باستخدام التعلم الآلي والتحليل الإحصائي، نكشف الأنماط الخفية في بياناتك ونقدم استشرافاً مستقبلياً يمنح مؤسستك ميزة تنافسية حقيقية.",
    features: [
      { feature_en: "Demand & revenue forecasting models", feature_ar: "نماذج التنبؤ بالطلب والإيرادات" },
      { feature_en: "Customer churn & behavior prediction", feature_ar: "التنبؤ بتراجع العملاء وسلوكهم" },
      { feature_en: "Anomaly detection & risk scoring", feature_ar: "اكتشاف الشذوذات وتسجيل المخاطر" },
      { feature_en: "KPI tracking & executive dashboards", feature_ar: "تتبع مؤشرات الأداء ولوحات المعلومات التنفيذية" },
      { feature_en: "AI-generated natural language insights", feature_ar: "رؤى باللغة الطبيعية مولّدة بالذكاء الاصطناعي" }
    ],
    images: [
      { imageLink: "https://placehold.co/800x600?text=Predictive+Modeling", public_id: "technova/services/srv-007-cover" }
    ]
  },
  {
    customId: "SRV-008",
    slug: "ai-powered-video-image-production",
    name_en: "AI-Powered Video & Image Production",
    name_ar: "إنتاج الفيديو والصور المدعوم بالذكاء الاصطناعي",
    shortDescription_en: "Generative AI-enhanced video and image content produced at scale.",
    shortDescription_ar: "محتوى فيديو وصور معزّز بالذكاء الاصطناعي التوليدي يُنتج على نطاق واسع.",
    description_en: "We produce high-quality visual content — videos, images, and motion graphics — enhanced by generative AI. From marketing campaigns to training materials, we combine creative expertise with AI acceleration to deliver compelling visuals at speed and scale.",
    description_ar: "ننتج محتوى بصرياً عالي الجودة — فيديوهات وصور وموشن جرافيك — معزّز بالذكاء الاصطناعي التوليدي. من الحملات التسويقية إلى المواد التدريبية، نجمع بين الخبرة الإبداعية وسرعة الذكاء الاصطناعي لتسليم مرئيات مؤثرة بسرعة وعلى نطاق واسع.",
    features: [
      { feature_en: "AI-generated & enhanced video production", feature_ar: "إنتاج فيديو مولّد ومحسّن بالذكاء الاصطناعي" },
      { feature_en: "Brand-consistent image generation", feature_ar: "توليد صور متسقة مع الهوية البصرية" },
      { feature_en: "Motion graphics & explainer videos", feature_ar: "موشن جرافيك وفيديوهات تعريفية" },
      { feature_en: "AI-powered post-production & editing", feature_ar: "مونتاج وما بعد إنتاج مدعوم بالذكاء الاصطناعي" },
      { feature_en: "Multilingual voiceover & subtitle generation", feature_ar: "توليد تعليق صوتي وترجمة متعدد اللغات" }
    ],
    images: [
      { imageLink: "https://placehold.co/800x600?text=Video+Production", public_id: "technova/services/srv-008-cover" }
    ]
  },
  {
    customId: "SRV-009",
    slug: "virtual-avatars-digital-twins",
    name_en: "Virtual Avatars & Digital Twins Development",
    name_ar: "تطوير الأفاتارات الافتراضية والتوائم الرقمية",
    shortDescription_en: "Lifelike AI avatars and digital twins for interactive brand and training experiences.",
    shortDescription_ar: "أفاتارات ذكاء اصطناعي واقعية وتوائم رقمية للتجارب التفاعلية والتدريب.",
    description_en: "We create lifelike AI avatars and digital twin models for interactive experiences, customer service, training simulations, and brand representation. Our avatars are customizable, multilingual, and deployable across web, mobile, and immersive platforms.",
    description_ar: "نصنع أفاتارات ذكاء اصطناعي واقعية ونماذج توائم رقمية للتجارب التفاعلية وخدمة العملاء ومحاكاة التدريب وتمثيل العلامة التجارية. أفاتاراتنا قابلة للتخصيص ومتعددة اللغات وقابلة للنشر عبر الويب والموبايل والمنصات الغامرة.",
    features: [
      { feature_en: "Photorealistic AI avatar creation", feature_ar: "إنشاء أفاتارات ذكاء اصطناعي فائقة الواقعية" },
      { feature_en: "Digital twin modeling & simulation", feature_ar: "نمذجة ومحاكاة التوائم الرقمية" },
      { feature_en: "Multilingual real-time lip sync", feature_ar: "مزامنة الشفاه الفورية متعددة اللغات" },
      { feature_en: "Interactive avatar for customer service", feature_ar: "أفاتار تفاعلي لخدمة العملاء" },
      { feature_en: "Web, mobile & metaverse deployment", feature_ar: "نشر على الويب والموبايل والميتافيرس" }
    ],
    images: [
      { imageLink: "https://placehold.co/800x600?text=Digital+Twins", public_id: "technova/services/srv-009-cover" }
    ]
  },
  {
    customId: "SRV-010",
    slug: "interactive-experiences-deepfake-solutions",
    name_en: "Interactive Experiences & Deepfake Solutions",
    name_ar: "التجارب التفاعلية وحلول التزييف العميق",
    shortDescription_en: "Immersive interactive experiences and responsibly deployed synthetic media.",
    shortDescription_ar: "تجارب تفاعلية غامرة ووسائط اصطناعية يتم نشرها بمسؤولية.",
    description_en: "We design immersive, interactive digital experiences and responsibly deploy synthetic media technologies for legitimate use cases — including training simulations, localization, historical preservation, and controlled marketing activations.",
    description_ar: "نصمم تجارب رقمية غامرة وتفاعلية، وننشر تقنيات الوسائط الاصطناعية بمسؤولية لحالات استخدام مشروعة — تشمل محاكاة التدريب والتعريب والحفاظ على التراث التاريخي وتفعيلات التسويق المنضبطة.",
    features: [
      { feature_en: "Interactive web & kiosk experiences", feature_ar: "تجارب ويب وكشك تفاعلية" },
      { feature_en: "Synthetic media for training & localization", feature_ar: "وسائط اصطناعية للتدريب والتعريب" },
      { feature_en: "Controlled deepfake for marketing activations", feature_ar: "تزييف عميق منضبط لتفعيلات التسويق" },
      { feature_en: "Historical & archival content recreation", feature_ar: "إعادة إنشاء المحتوى التاريخي والأرشيفي" },
      { feature_en: "XR & immersive environment design", feature_ar: "تصميم بيئات XR والواقع الغامر" }
    ],
    images: [
      { imageLink: "https://placehold.co/800x600?text=Interactive+XR", public_id: "technova/services/srv-010-cover" }
    ]
  },
  {
    customId: "SRV-011",
    slug: "text-to-speech-voice-cloning",
    name_en: "Text-to-Speech & Voice Cloning",
    name_ar: "تحويل النص إلى كلام واستنساخ الصوت",
    shortDescription_en: "Brand-accurate AI voices in Arabic and English for any platform or use case.",
    shortDescription_ar: "أصوات ذكاء اصطناعي دقيقة ومتوافقة مع علامتك التجارية بالعربية والإنجليزية.",
    description_en: "We deliver natural-sounding, AI-generated voices in Arabic and English tailored to your brand identity. From IVR systems to e-learning narration and content localization, our voice solutions combine emotional depth, dialect accuracy, and production-ready output.",
    description_ar: "نقدم أصواتاً مولّدة بالذكاء الاصطناعي تبدو طبيعية باللغتين العربية والإنجليزية ومصممة لتعكس هوية علامتك التجارية. من أنظمة الرد الآلي إلى سرد التعلم الإلكتروني وتعريب المحتوى، تجمع حلول الصوت لدينا بين العمق العاطفي ودقة اللهجة والجاهزية الإنتاجية.",
    features: [
      { feature_en: "Arabic & English neural TTS voices", feature_ar: "أصوات TTS عصبية عربية وإنجليزية" },
      { feature_en: "Custom voice cloning from short samples", feature_ar: "استنساخ صوت مخصص من عينات قصيرة" },
      { feature_en: "Dialect & accent customization", feature_ar: "تخصيص اللهجة والنبرة" },
      { feature_en: "IVR & call center voice integration", feature_ar: "تكامل الصوت مع أنظمة IVR ومراكز الاتصال" },
      { feature_en: "E-learning & podcast narration production", feature_ar: "إنتاج سرد للتعلم الإلكتروني والبودكاست" }
    ],
    images: [
      { imageLink: "https://placehold.co/800x600?text=TTS+Voice+Cloning", public_id: "technova/services/srv-011-cover" }
    ]
  },
  {
    customId: "SRV-012",
    slug: "speech-to-speech-processing",
    name_en: "Speech-to-Speech Processing",
    name_ar: "معالجة الكلام إلى كلام",
    shortDescription_en: "Real-time voice conversion that preserves tone, emotion, and speaker identity.",
    shortDescription_ar: "تحويل صوت فوري يحافظ على النبرة والمشاعر وهوية المتحدث.",
    description_en: "We build real-time voice conversion and speech transformation pipelines that preserve tone, emotion, and speaker characteristics. Ideal for live interpretation, voice anonymization, accessibility tools, and AI-powered communication platforms.",
    description_ar: "نبني خطوط تحويل صوت فوري ومعالجة كلام تحافظ على النبرة والمشاعر وخصائص المتحدث. مثالية للترجمة الفورية وإخفاء هوية الصوت وأدوات إمكانية الوصول ومنصات التواصل المدعومة بالذكاء الاصطناعي.",
    features: [
      { feature_en: "Real-time voice style transfer", feature_ar: "نقل أسلوب الصوت في الوقت الفعلي" },
      { feature_en: "Speaker identity preservation & transformation", feature_ar: "الحفاظ على هوية المتحدث وتحويلها" },
      { feature_en: "Noise cancellation & audio enhancement", feature_ar: "إلغاء الضوضاء وتحسين الصوت" },
      { feature_en: "Live interpretation & dubbing pipelines", feature_ar: "خطوط ترجمة فورية ودبلجة مباشرة" },
      { feature_en: "Voice anonymization for privacy compliance", feature_ar: "إخفاء هوية الصوت للامتثال للخصوصية" }
    ],
    images: [
      { imageLink: "https://placehold.co/800x600?text=Speech+Processing", public_id: "technova/services/srv-012-cover" }
    ]
  },
  {
    customId: "SRV-013",
    slug: "ai-music-audio-generation",
    name_en: "AI Music & Audio Generation",
    name_ar: "توليد الموسيقى والصوت بالذكاء الاصطناعي",
    shortDescription_en: "Original AI-composed music and audio branding with no licensing limits.",
    shortDescription_ar: "موسيقى مؤلّفة بالذكاء الاصطناعي وهوية صوتية أصلية بدون قيود ترخيص.",
    description_en: "We compose original AI-generated music, soundscapes, and audio branding assets tailored to your content and emotional intent. From background scores for video content to full sonic brand identities, we deliver production-ready audio without licensing limitations.",
    description_ar: "نؤلف موسيقى أصلية مولّدة بالذكاء الاصطناعي ومشاهد صوتية وأصول هوية صوتية مصممة لمحتواك وقصدك العاطفي. من الموسيقى التصويرية لمحتوى الفيديو إلى هويات العلامة الصوتية المتكاملة، نقدم صوتاً جاهزاً للإنتاج بدون قيود ترخيص.",
    features: [
      { feature_en: "Custom AI-composed background music", feature_ar: "موسيقى خلفية مؤلّفة بالذكاء الاصطناعي" },
      { feature_en: "Sonic brand identity & audio logo creation", feature_ar: "هوية صوتية وشعار صوتي للعلامة التجارية" },
      { feature_en: "Mood-matched soundscapes for video content", feature_ar: "مشاهد صوتية تتوافق مع مزاج محتوى الفيديو" },
      { feature_en: "Royalty-free, license-free output", feature_ar: "مخرجات خالية من حقوق النشر والترخيص" },
      { feature_en: "Arabic & regional music style generation", feature_ar: "توليد موسيقى بالأسلوب العربي والإقليمي" }
    ],
    images: [
      { imageLink: "https://placehold.co/800x600?text=AI+Music", public_id: "technova/services/srv-013-cover" }
    ]
  }
];

const seed = async () => {
  await mongoose.connect("mongodb+srv://technovaback:Technovaback@technova.8dw83vt.mongodb.net/technova?appName=technova");
  await serviceModel.deleteMany({});
  await serviceModel.insertMany(services);
  console.log("✅ 13 services seeded successfully");
  mongoose.disconnect();
};

seed().catch(console.error);
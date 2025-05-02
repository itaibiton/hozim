export interface ContractField {
    id: string;
    label: string;
    type: 'text' | 'textarea' | 'date' | 'select' | 'signature';
    placeholder?: string;
    options?: string[];
    required?: boolean;
    defaultValue?: string;
}

export interface ContractTemplate {
    id: string;
    title: string;
    category: 'apartment' | 'car' | 'work' | 'general';
    description: string;
    thumbnail: string;
    content: string;
    fields: ContractField[];
}

export interface Contract extends ContractTemplate {
    userId?: string;
    createdAt: string;
    updatedAt: string;
    fieldValues: Record<string, string>;
}

export const contractCategories = [
    {
        id: 'apartment',
        title: 'חוזי דירה',
        description: 'הסכמי שכירות, מכירה ושיתוף בדירות',
        icon: '🏠',
    },
    {
        id: 'car',
        title: 'חוזי רכב',
        description: 'הסכמי מכירה והשכרת רכב',
        icon: '🚗',
    },
    {
        id: 'work',
        title: 'חוזי עבודה',
        description: 'הסכמי העסקה, שירות וקבלנות',
        icon: '💼',
    },
    {
        id: 'general',
        title: 'חוזים כלליים',
        description: 'הסכמים משפטיים כלליים',
        icon: '📄',
    },
];

export const contractTemplates: ContractTemplate[] = [
    {
        id: 'apartment-rental',
        title: 'הסכם שכירות דירה',
        category: 'apartment',
        description: 'חוזה שכירות סטנדרטי לדירה',
        thumbnail: '🏠',
        content: `
      <h1 class="contract-title">הסכם שכירות דירה</h1>
      
      <div class="contract-paragraph">
        שנערך ונחתם ב{{city}} ביום {{day}} לחודש {{month}} שנת {{year}}
      </div>
      
      <div class="contract-paragraph">
        <strong>בין:</strong> {{landlord_name}}, ת.ז. {{landlord_id}}
        <br/>
        מרחוב {{landlord_address}}, {{landlord_city}}
        <br/>
        טלפון: {{landlord_phone}}, דוא"ל: {{landlord_email}}
        <br/>
        (להלן: "המשכיר")
      </div>
      
      <div class="contract-paragraph">
        <strong>לבין:</strong> {{tenant_name}}, ת.ז. {{tenant_id}}
        <br/>
        מרחוב {{tenant_address}}, {{tenant_city}}
        <br/>
        טלפון: {{tenant_phone}}, דוא"ל: {{tenant_email}}
        <br/>
        (להלן: "השוכר")
      </div>
      
      <h2 class="contract-section">הואיל:</h2>
      
      <div class="contract-paragraph">
        והמשכיר הינו הבעלים הרשום ו/או בעל זכויות החזקה ו/או בעל הזכות להשכיר את הדירה ברחוב {{property_address}}, {{property_city}}, הידועה גם כגוש {{property_block}}, חלקה {{property_plot}}, תת-חלקה {{property_sub_plot}} (להלן: "הדירה");
      </div>
      
      <div class="contract-paragraph">
        והשוכר מעוניין לשכור את הדירה מאת המשכיר לתקופה ובתנאים המפורטים בהסכם זה להלן;
      </div>
      
      <div class="contract-paragraph">
        והמשכיר מסכים להשכיר לשוכר את הדירה לתקופה ובתנאים המפורטים בהסכם זה להלן;
      </div>
      
      <h2 class="contract-section">לפיכך הוסכם, הותנה והוצהר בין הצדדים כדלקמן:</h2>
      
      <div class="contract-paragraph">
        1. המבוא להסכם זה מהווה חלק בלתי נפרד ממנו.
      </div>
      
      <div class="contract-paragraph">
        2. המשכיר משכיר בזאת לשוכר והשוכר שוכר בזאת מאת המשכיר את הדירה לתקופה של {{rental_period}} חודשים החל מיום {{start_date}} ועד ליום {{end_date}} (להלן: "תקופת השכירות").
      </div>
      
      <div class="contract-paragraph">
        3. השוכר מתחייב לשלם למשכיר דמי שכירות חודשיים בסך {{monthly_rent}} ש"ח ({{monthly_rent_words}} שקלים חדשים) לכל חודש מחודשי השכירות, כאשר התשלום יבוצע מידי חודש בחודשו עד ל-{{payment_day}} בכל חודש קלנדרי.
      </div>
      
      <div class="contract-paragraph">
        4. בנוסף לדמי השכירות, ישלם השוכר את כל התשלומים השוטפים בגין השימוש בדירה, לרבות חשמל, מים, ארנונה, גז, ועד בית וכיו"ב.
      </div>
      
      <div class="contract-signature">
        ולראיה באו הצדדים על החתום:
        <div class="flex justify-between mt-8">
          <div>
            <div class="mb-8">____________________</div>
            <div>המשכיר</div>
          </div>
          <div>
            <div class="mb-8">____________________</div>
            <div>השוכר</div>
          </div>
        </div>
      </div>
      `,
        fields: [
            { id: 'city', label: 'עיר חתימה', type: 'text', placeholder: 'תל אביב', required: true },
            { id: 'day', label: 'יום חתימה', type: 'text', placeholder: '1', required: true },
            { id: 'month', label: 'חודש חתימה', type: 'text', placeholder: 'ינואר', required: true },
            { id: 'year', label: 'שנת חתימה', type: 'text', placeholder: '2025', required: true },
            { id: 'landlord_name', label: 'שם המשכיר', type: 'text', placeholder: 'ישראל ישראלי', required: true },
            { id: 'landlord_id', label: 'ת.ז. המשכיר', type: 'text', placeholder: '012345678', required: true },
            { id: 'landlord_address', label: 'כתובת המשכיר', type: 'text', placeholder: 'רחוב הרצל 1', required: true },
            { id: 'landlord_city', label: 'עיר המשכיר', type: 'text', placeholder: 'תל אביב', required: true },
            { id: 'landlord_phone', label: 'טלפון המשכיר', type: 'text', placeholder: '050-1234567', required: true },
            { id: 'landlord_email', label: 'דוא״ל המשכיר', type: 'text', placeholder: 'example@email.com', required: true },
            { id: 'tenant_name', label: 'שם השוכר', type: 'text', placeholder: 'ישראלה ישראלי', required: true },
            { id: 'tenant_id', label: 'ת.ז. השוכר', type: 'text', placeholder: '012345678', required: true },
            { id: 'tenant_address', label: 'כתובת השוכר', type: 'text', placeholder: 'רחוב אלנבי 2', required: true },
            { id: 'tenant_city', label: 'עיר השוכר', type: 'text', placeholder: 'תל אביב', required: true },
            { id: 'tenant_phone', label: 'טלפון השוכר', type: 'text', placeholder: '050-7654321', required: true },
            { id: 'tenant_email', label: 'דוא״ל השוכר', type: 'text', placeholder: 'example@email.com', required: true },
            { id: 'property_address', label: 'כתובת הנכס', type: 'text', placeholder: 'רחוב דיזנגוף 10', required: true },
            { id: 'property_city', label: 'עיר הנכס', type: 'text', placeholder: 'תל אביב', required: true },
            { id: 'property_block', label: 'גוש', type: 'text', placeholder: '12345', required: true },
            { id: 'property_plot', label: 'חלקה', type: 'text', placeholder: '67', required: true },
            { id: 'property_sub_plot', label: 'תת-חלקה', type: 'text', placeholder: '8', required: false },
            { id: 'rental_period', label: 'תקופת שכירות (חודשים)', type: 'text', placeholder: '12', required: true },
            { id: 'start_date', label: 'תאריך תחילה', type: 'date', required: true },
            { id: 'end_date', label: 'תאריך סיום', type: 'date', required: true },
            { id: 'monthly_rent', label: 'דמי שכירות חודשיים (₪)', type: 'text', placeholder: '4000', required: true },
            { id: 'monthly_rent_words', label: 'דמי שכירות במילים', type: 'text', placeholder: 'ארבעת אלפים', required: true },
            { id: 'payment_day', label: 'יום תשלום בחודש', type: 'text', placeholder: '5', required: true },
        ]
    },
    {
        id: 'car-sale',
        title: 'הסכם מכירת רכב',
        category: 'car',
        description: 'חוזה למכירת רכב בין אנשים פרטיים',
        thumbnail: '🚗',
        content: `
      <h1 class="contract-title">הסכם מכירת רכב</h1>
      
      <div class="contract-paragraph">
        שנערך ונחתם ב{{city}} ביום {{day}} לחודש {{month}} שנת {{year}}
      </div>
      
      <div class="contract-paragraph">
        <strong>בין:</strong> {{seller_name}}, ת.ז. {{seller_id}}
        <br/>
        מרחוב {{seller_address}}, {{seller_city}}
        <br/>
        טלפון: {{seller_phone}}
        <br/>
        (להלן: "המוכר")
      </div>
      
      <div class="contract-paragraph">
        <strong>לבין:</strong> {{buyer_name}}, ת.ז. {{buyer_id}}
        <br/>
        מרחוב {{buyer_address}}, {{buyer_city}}
        <br/>
        טלפון: {{buyer_phone}}
        <br/>
        (להלן: "הקונה")
      </div>
      
      <h2 class="contract-section">הואיל:</h2>
      
      <div class="contract-paragraph">
        והמוכר הינו הבעלים הרשום של רכב מסוג {{car_manufacturer}} {{car_model}}, שנת ייצור {{car_year}}, בעל מספר רישוי {{car_license}}, מספר שלדה {{car_vin}} ומספר מנוע {{car_engine}} (להלן: "הרכב");
      </div>
      
      <div class="contract-paragraph">
        והקונה מעוניין לרכוש את הרכב מאת המוכר והמוכר מעוניין למכור את הרכב לקונה;
      </div>
      
      <h2 class="contract-section">לפיכך הוסכם והותנה בין הצדדים כדלקמן:</h2>
      
      <div class="contract-paragraph">
        1. המוכר מצהיר כי הרכב הנ"ל הינו בבעלותו הבלעדית וכי הוא נקי מכל שעבוד, עיקול או זכות צד ג' כלשהי.
      </div>
      
      <div class="contract-paragraph">
        2. המוכר מוכר בזאת לקונה והקונה רוכש בזאת מאת המוכר את הרכב הנ"ל במצבו AS IS.
      </div>
      
      <div class="contract-paragraph">
        3. הקונה מצהיר כי ראה ובדק את הרכב ומצא אותו במצב תקין ולשביעות רצונו המוחלטת, לאחר שניתנה לו האפשרות לבדוק את הרכב ככל שרצה.
      </div>
      
      <div class="contract-paragraph">
        4. תמורת הרכב הנ"ל ישלם הקונה למוכר סך של {{price}} ש"ח ({{price_words}} שקלים חדשים) באופן הבא:
        <br/>
        א. סך של {{deposit}} ש"ח שולם במעמד חתימת הסכם זה כמקדמה.
        <br/>
        ב. היתרה בסך {{balance}} ש"ח תשולם במעמד מסירת הרכב לידי הקונה.
      </div>
      
      <div class="contract-paragraph">
        5. מסירת הרכב לקונה תתבצע ביום {{delivery_date}} בכתובת {{delivery_address}}.
      </div>
      
      <div class="contract-signature">
        ולראיה באו הצדדים על החתום:
        <div class="flex justify-between mt-8">
          <div>
            <div class="mb-8">____________________</div>
            <div>המוכר</div>
          </div>
          <div>
            <div class="mb-8">____________________</div>
            <div>הקונה</div>
          </div>
        </div>
      </div>
      `,
        fields: [
            { id: 'city', label: 'עיר חתימה', type: 'text', placeholder: 'תל אביב', required: true },
            { id: 'day', label: 'יום חתימה', type: 'text', placeholder: '1', required: true },
            { id: 'month', label: 'חודש חתימה', type: 'text', placeholder: 'ינואר', required: true },
            { id: 'year', label: 'שנת חתימה', type: 'text', placeholder: '2025', required: true },
            { id: 'seller_name', label: 'שם המוכר', type: 'text', placeholder: 'ישראל ישראלי', required: true },
            { id: 'seller_id', label: 'ת.ז. המוכר', type: 'text', placeholder: '012345678', required: true },
            { id: 'seller_address', label: 'כתובת המוכר', type: 'text', placeholder: 'רחוב הרצל 1', required: true },
            { id: 'seller_city', label: 'עיר המוכר', type: 'text', placeholder: 'תל אביב', required: true },
            { id: 'seller_phone', label: 'טלפון המוכר', type: 'text', placeholder: '050-1234567', required: true },
            { id: 'buyer_name', label: 'שם הקונה', type: 'text', placeholder: 'ישראלה ישראלי', required: true },
            { id: 'buyer_id', label: 'ת.ז. הקונה', type: 'text', placeholder: '012345678', required: true },
            { id: 'buyer_address', label: 'כתובת הקונה', type: 'text', placeholder: 'רחוב אלנבי 2', required: true },
            { id: 'buyer_city', label: 'עיר הקונה', type: 'text', placeholder: 'תל אביב', required: true },
            { id: 'buyer_phone', label: 'טלפון הקונה', type: 'text', placeholder: '050-7654321', required: true },
            { id: 'car_manufacturer', label: 'יצרן הרכב', type: 'text', placeholder: 'טויוטה', required: true },
            { id: 'car_model', label: 'דגם הרכב', type: 'text', placeholder: 'קורולה', required: true },
            { id: 'car_year', label: 'שנת ייצור', type: 'text', placeholder: '2020', required: true },
            { id: 'car_license', label: 'מספר רישוי', type: 'text', placeholder: '12-345-67', required: true },
            { id: 'car_vin', label: 'מספר שלדה', type: 'text', placeholder: 'ABCD1234567890', required: true },
            { id: 'car_engine', label: 'מספר מנוע', type: 'text', placeholder: 'ABC123456', required: true },
            { id: 'price', label: 'מחיר הרכב (₪)', type: 'text', placeholder: '50000', required: true },
            { id: 'price_words', label: 'מחיר במילים', type: 'text', placeholder: 'חמישים אלף', required: true },
            { id: 'deposit', label: 'מקדמה (₪)', type: 'text', placeholder: '5000', required: true },
            { id: 'balance', label: 'יתרת תשלום (₪)', type: 'text', placeholder: '45000', required: true },
            { id: 'delivery_date', label: 'תאריך מסירה', type: 'date', required: true },
            { id: 'delivery_address', label: 'כתובת מסירה', type: 'text', placeholder: 'רחוב הרצל 1, תל אביב', required: true },
        ]
    },
    {
        id: 'work-agreement',
        title: 'הסכם העסקה',
        category: 'work',
        description: 'חוזה העסקת עובד',
        thumbnail: '💼',
        content: `
      <h1 class="contract-title">הסכם העסקה</h1>
      
      <div class="contract-paragraph">
        שנערך ונחתם ב{{city}} ביום {{day}} לחודש {{month}} שנת {{year}}
      </div>
      
      <div class="contract-paragraph">
        <strong>בין:</strong> {{employer_name}}, ח.פ./ע.מ. {{employer_id}}
        <br/>
        מרחוב {{employer_address}}, {{employer_city}}
        <br/>
        (להלן: "המעסיק")
      </div>
      
      <div class="contract-paragraph">
        <strong>לבין:</strong> {{employee_name}}, ת.ז. {{employee_id}}
        <br/>
        מרחוב {{employee_address}}, {{employee_city}}
        <br/>
        (להלן: "העובד")
      </div>
      
      <h2 class="contract-section">הואיל:</h2>
      
      <div class="contract-paragraph">
        והמעסיק מעוניין להעסיק את העובד בתפקיד {{position}} והעובד מעוניין לעבוד אצל המעסיק בתפקיד האמור;
      </div>
      
      <div class="contract-paragraph">
        והצדדים מעוניינים להסדיר את תנאי העסקתו של העובד אצל המעסיק בהתאם להוראות הסכם זה;
      </div>
      
      <h2 class="contract-section">לפיכך הוסכם, הותנה והוצהר בין הצדדים כדלקמן:</h2>
      
      <div class="contract-paragraph">
        1. <strong>תפקיד ותיאור משרה</strong>
        <br/>
        א. העובד יועסק בתפקיד {{position}} בהיקף של {{scope}} משרה.
        <br/>
        ב. במסגרת תפקידו, יהיה העובד אחראי על {{responsibilities}}.
      </div>
      
      <div class="contract-paragraph">
        2. <strong>תקופת ההעסקה</strong>
        <br/>
        א. תחילת העסקתו של העובד הינה ביום {{start_date}}.
        <br/>
        ב. ששת החודשים הראשונים להעסקתו של העובד יהוו תקופת ניסיון.
      </div>
      
      <div class="contract-paragraph">
        3. <strong>שכר ותנאים סוציאליים</strong>
        <br/>
        א. שכרו החודשי ברוטו של העובד יעמוד על סך של {{salary}} ש"ח.
        <br/>
        ב. המעסיק יפריש עבור העובד הפרשות לפנסיה, פיצויי פיטורין וקרן השתלמות בהתאם לחוק.
      </div>
      
      <div class="contract-paragraph">
        4. <strong>ימי עבודה ושעות עבודה</strong>
        <br/>
        א. ימי העבודה של העובד הינם {{work_days}}.
        <br/>
        ב. שעות העבודה של העובד הינן {{work_hours}}.
      </div>
      
      <div class="contract-signature">
        ולראיה באו הצדדים על החתום:
        <div class="flex justify-between mt-8">
          <div>
            <div class="mb-8">____________________</div>
            <div>המעסיק</div>
          </div>
          <div>
            <div class="mb-8">____________________</div>
            <div>העובד</div>
          </div>
        </div>
      </div>
      `,
        fields: [
            { id: 'city', label: 'עיר חתימה', type: 'text', placeholder: 'תל אביב', required: true },
            { id: 'day', label: 'יום חתימה', type: 'text', placeholder: '1', required: true },
            { id: 'month', label: 'חודש חתימה', type: 'text', placeholder: 'ינואר', required: true },
            { id: 'year', label: 'שנת חתימה', type: 'text', placeholder: '2025', required: true },
            { id: 'employer_name', label: 'שם המעסיק', type: 'text', placeholder: 'חברת אלפא בע״מ', required: true },
            { id: 'employer_id', label: 'ח.פ./ע.מ. המעסיק', type: 'text', placeholder: '512345678', required: true },
            { id: 'employer_address', label: 'כתובת המעסיק', type: 'text', placeholder: 'רחוב הרצל 1', required: true },
            { id: 'employer_city', label: 'עיר המעסיק', type: 'text', placeholder: 'תל אביב', required: true },
            { id: 'employee_name', label: 'שם העובד', type: 'text', placeholder: 'ישראל ישראלי', required: true },
            { id: 'employee_id', label: 'ת.ז. העובד', type: 'text', placeholder: '012345678', required: true },
            { id: 'employee_address', label: 'כתובת העובד', type: 'text', placeholder: 'רחוב אלנבי 2', required: true },
            { id: 'employee_city', label: 'עיר העובד', type: 'text', placeholder: 'תל אביב', required: true },
            { id: 'position', label: 'תפקיד', type: 'text', placeholder: 'מנהל תפעול', required: true },
            { id: 'scope', label: 'היקף משרה', type: 'text', placeholder: '100%', required: true },
            { id: 'responsibilities', label: 'תחומי אחריות', type: 'textarea', placeholder: 'ניהול צוות העובדים, תכנון תקציב, דיווח להנהלה', required: true },
            { id: 'start_date', label: 'תאריך תחילת העסקה', type: 'date', required: true },
            { id: 'salary', label: 'שכר חודשי (₪)', type: 'text', placeholder: '15000', required: true },
            { id: 'work_days', label: 'ימי עבודה', type: 'text', placeholder: 'א׳-ה׳', required: true },
            { id: 'work_hours', label: 'שעות עבודה', type: 'text', placeholder: '09:00-18:00', required: true },
        ]
    },
    {
        id: 'nda-agreement',
        title: 'הסכם סודיות',
        category: 'general',
        description: 'הסכם לשמירת סודיות',
        thumbnail: '🔒',
        content: `
      <h1 class="contract-title">הסכם סודיות</h1>
      
      <div class="contract-paragraph">
        שנערך ונחתם ב{{city}} ביום {{day}} לחודש {{month}} שנת {{year}}
      </div>
      
      <div class="contract-paragraph">
        <strong>בין:</strong> {{company_name}}, ח.פ./ע.מ. {{company_id}}
        <br/>
        מרחוב {{company_address}}, {{company_city}}
        <br/>
        (להלן: "החברה")
      </div>
      
      <div class="contract-paragraph">
        <strong>לבין:</strong> {{recipient_name}}, ת.ז./ח.פ. {{recipient_id}}
        <br/>
        מרחוב {{recipient_address}}, {{recipient_city}}
        <br/>
        (להלן: "מקבל המידע")
      </div>
      
      <h2 class="contract-section">הואיל:</h2>
      
      <div class="contract-paragraph">
        והחברה עוסקת ב{{company_business}} (להלן: "תחום העיסוק");
      </div>
      
      <div class="contract-paragraph">
        והחברה עשויה למסור למקבל המידע, במסגרת התקשרות הצדדים לצורך {{purpose}}, מידע סודי כהגדרתו להלן;
      </div>
      
      <div class="contract-paragraph">
        והחברה מעוניינת להגן על המידע הסודי שלה;
      </div>
      
      <h2 class="contract-section">לפיכך הוסכם, הותנה והוצהר בין הצדדים כדלקמן:</h2>
      
      <div class="contract-paragraph">
        1. <strong>הגדרת "מידע סודי"</strong>
        <br/>
        "מידע סודי" משמעו כל מידע, בין אם בעל פה ובין אם בכתב, הנוגע לחברה, לרבות אך לא רק, מידע טכני, מסחרי, עסקי, פיננסי, מקצועי או אחר, הקשור לחברה, לרבות תוכניות, נתונים, נוסחאות, תהליכים, ידע, המצאות, פיתוחים, שיפורים, רעיונות, אלגוריתמים, קניין רוחני, סודות מסחריים, תוכנות, חומרה, מוצרים, שירותים, תוכניות שיווק ואסטרטגיות, מידע על לקוחות, רשימות לקוחות, מחירים, עלויות, מידע על ספקים, וכל מידע אחר בעל ערך עסקי או מסחרי הקשור לחברה.
      </div>
      
      <div class="contract-paragraph">
        2. <strong>התחייבויות מקבל המידע</strong>
        <br/>
        א. מקבל המידע מתחייב לשמור על סודיות מוחלטת של המידע הסודי.
        <br/>
        ב. מקבל המידע מתחייב שלא לגלות, לפרסם, להפיץ, למכור, להשכיר, למסור, להעביר, להמחות או להעמיד לרשות צד שלישי כלשהו את המידע הסודי, אלא באישור מראש ובכתב מהחברה.
        <br/>
        ג. מקבל המידע מתחייב לנקוט בכל האמצעים הסבירים למניעת גילוי המידע הסודי.
        <br/>
        ד. מקבל המידע מתחייב שלא לעשות כל שימוש במידע הסודי אלא למטרה שלשמה נמסר לו.
      </div>
      
      <div class="contract-paragraph">
        3. <strong>תקופת ההתחייבות</strong>
        <br/>
        התחייבויות מקבל המידע על פי הסכם זה יהיו בתוקף למשך תקופה של {{duration}} שנים ממועד חתימת הסכם זה.
      </div>
      
      <div class="contract-signature">
        ולראיה באו הצדדים על החתום:
        <div class="flex justify-between mt-8">
          <div>
            <div class="mb-8">____________________</div>
            <div>החברה</div>
          </div>
          <div>
            <div class="mb-8">____________________</div>
            <div>מקבל המידע</div>
          </div>
        </div>
      </div>
      `,
        fields: [
            { id: 'city', label: 'עיר חתימה', type: 'text', placeholder: 'תל אביב', required: true },
            { id: 'day', label: 'יום חתימה', type: 'text', placeholder: '1', required: true },
            { id: 'month', label: 'חודש חתימה', type: 'text', placeholder: 'ינואר', required: true },
            { id: 'year', label: 'שנת חתימה', type: 'text', placeholder: '2025', required: true },
            { id: 'company_name', label: 'שם החברה', type: 'text', placeholder: 'חברת אלפא בע״מ', required: true },
            { id: 'company_id', label: 'ח.פ./ע.מ. החברה', type: 'text', placeholder: '512345678', required: true },
            { id: 'company_address', label: 'כתובת החברה', type: 'text', placeholder: 'רחוב הרצל 1', required: true },
            { id: 'company_city', label: 'עיר החברה', type: 'text', placeholder: 'תל אביב', required: true },
            { id: 'company_business', label: 'תחום עיסוק החברה', type: 'text', placeholder: 'פיתוח תוכנה', required: true },
            { id: 'recipient_name', label: 'שם מקבל המידע', type: 'text', placeholder: 'ישראל ישראלי', required: true },
            { id: 'recipient_id', label: 'ת.ז./ח.פ. מקבל המידע', type: 'text', placeholder: '012345678', required: true },
            { id: 'recipient_address', label: 'כתובת מקבל המידע', type: 'text', placeholder: 'רחוב אלנבי 2', required: true },
            { id: 'recipient_city', label: 'עיר מקבל המידע', type: 'text', placeholder: 'תל אביב', required: true },
            { id: 'purpose', label: 'מטרת ההתקשרות', type: 'textarea', placeholder: 'שיתוף פעולה עסקי בתחום פיתוח מוצר חדש', required: true },
            { id: 'duration', label: 'תקופת הסודיות (שנים)', type: 'text', placeholder: '5', required: true },
        ]
    },
];

// Helper functions
export function getContractTemplate(id: string): ContractTemplate | undefined {
    return contractTemplates.find(template => template.id === id);
}

export function getContractsByCategory(category: string): ContractTemplate[] {
    return contractTemplates.filter(template => template.category === category);
}

const mockUserContracts: Contract[] = [
    {
        ...contractTemplates[0],
        userId: 'user123',
        createdAt: new Date(2025, 0, 1).toISOString(),
        updatedAt: new Date(2025, 0, 1).toISOString(),
        fieldValues: {
            city: 'תל אביב',
            day: '1',
            month: 'ינואר',
            year: '2025',
            landlord_name: 'יוסי כהן',
            landlord_id: '012345678',
            // ... other values
        }
    },
    {
        ...contractTemplates[1],
        userId: 'user123',
        createdAt: new Date(2025, 0, 2).toISOString(),
        updatedAt: new Date(2025, 0, 2).toISOString(),
        fieldValues: {
            city: 'חיפה',
            day: '2',
            month: 'פברואר',
            year: '2025',
            seller_name: 'דני לוי',
            seller_id: '012345678',
            // ... other values
        }
    }
];

export function getUserContracts(): Contract[] {
    // In a real app, this would fetch from a database
    return mockUserContracts;
}

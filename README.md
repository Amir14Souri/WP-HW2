# گزارش عملکرد پروژه نقاشی با React

## معرفی کلی

این پروژه یک برنامه نقاشی ساده تحت وب است که با استفاده از **ReactJS** و **TypeScript** پیاده‌سازی شده‌است. کاربران می‌توانند اشکال مختلفی را در یک بوم رسم کرده، آن‌ها را حذف کنند، و در صورت نیاز فایل نقاشی خود را ذخیره یا بارگذاری کنند.

## نحوه راه‌اندازی
به محل پروژه بروید و این دستورها را اجرا کنید.
```bash
npm install
npm run dev
```

## ابزارهای مورد استفاده

- ReactJS
- TypeScript
- TailwindCSS
- HTML5 FileReader API (for JSON handling)
- Blob API


## ویژگی‌های اصلی

### ۱. رسم اشکال مختلف
- از طریق **نوار کناری (Sidebar)**، کاربر می‌تواند نوع شکل (دایره، مربع یا مثلث) را انتخاب کند.
- با کلیک بر روی **بوم (Canvas)**، شکل انتخابی در مکان کلیک‌شده رسم می‌شود.

### ۲. حذف اشکال
- با **دابل‌کلیک** بر روی یک شکل، آن شکل از بوم حذف می‌شود.

### ۳. بارگذاری (Import)
- با کلیک بر روی دکمه‌ی «Import»، کاربر می‌تواند یک فایل `.json` شامل نقاشی‌های ذخیره‌شده را انتخاب کند.
- شکل‌های موجود در فایل بارگذاری‌شده در بوم نمایش داده می‌شوند.

### ۴. ذخیره‌سازی (Export)
- با کلیک بر روی دکمه‌ی «Export»، شکل‌های موجود در بوم به صورت یک فایل JSON ذخیره می‌شوند.

### ۵. شمارنده شکل‌ها
- در نوار پایین (Footer)، تعداد هر نوع از شکل‌ها به‌صورت زنده نمایش داده می‌شود.

### ۶. ویرایش عنوان
- عنوان نقاشی از طریق ورودی بالای صفحه قابل‌تغییر است.

## بررسی کد پروژه

### ۱. تعریف نوع شکل‌ها:
```ts
// types/shapes.ts
export type ShapeType = 'circle' | 'square' | 'triangle';

export interface Shape {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
}
```

### ۲. افزودن شکل جدید

```tsx
const addShape = (x: number, y: number) => {
  if (!selectedShape) return;
  setShapes([
    ...shapes,
    { id: crypto.randomUUID(), type: selectedShape, x, y }
  ]);
};
```

- از تابع `crypto.randomUUID()` برای ساخت id یکتا استفاده می‌شود.
- فقط در صورتی که شکلی انتخاب شده باشد، شکل جدید اضافه می‌شود.



### ۳. حذف شکل با دابل‌کلیک

```tsx
const removeShape = (id: string) => {
  setShapes(shapes.filter((s) => s.id !== id));
};
```

- این کد در فایل `Canvas.tsx` و در داخل حلقه‌ی رندر اشکال قرار دارد.
- با دابل‌کلیک روی یک شکل، آن از آرایه‌ی `shapes` حذف می‌شود.



### ۴. ذخیره‌سازی اطلاعات با Blob

```tsx
const data = JSON.stringify(shapes, null, 2);
const blob = new Blob([data], { type: "application/json" });
const url = URL.createObjectURL(blob);
```

- داده‌ها به فرمت JSON در قالب یک Blob ساخته می‌شوند.
- از `URL.createObjectURL` برای ساخت یک URL موقت جهت دانلود استفاده می‌شود.



### ۵. بارگذاری اطلاعات با FileReader

```tsx
const reader = new FileReader();
reader.onload = () => {
  const data = JSON.parse(reader.result as string);
  setShapes(data);
};
reader.readAsText(file);
```

- فایل بارگذاری‌شده به صورت متنی خوانده شده و سپس به JSON تبدیل می‌شود.
- پس از آن وضعیت جدیدی برای `shapes` تنظیم می‌گردد.



### ۶. شمارش اشکال

```tsx
const counts = shapes.reduce((acc, s) => {
  acc[s.type] = (acc[s.type] || 0) + 1;
  return acc;
}, {} as Record<ShapeType, number>);
```

- در Footer نمایش می‌دهد که هر نوع شکل (دایره، مربع، مثلث) چند بار استفاده شده است.

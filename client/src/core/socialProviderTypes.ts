/**
 * InversifyJS need to use the type as identifiers at runtime.
 * We use symbols as identifiers but you can also use classes and or string literals.
 */
export const SocialProviderTypes = {
  AuthorizeService: Symbol('AuthorizeService'),
  CommonService: Symbol('CommonService'),
  StorageService: Symbol('StorageService'),
  ImageGalleryService: Symbol('ImageGalleryService'),
  UserService: Symbol('UserService'),
  ProductService: Symbol('ProductService'),
  ShippingService: Symbol('ShippingService'),
  CartService: Symbol('CartService')

}
